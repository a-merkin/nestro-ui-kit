<!-- RangeSlider.vue -->
<template>
  <div class="range-slider" :class="{ 'range-slider--disabled': disabled }">
    <!-- Подписи сверху -->
    <div class="range-slider__labels-row">
      <span class="range-slider__label range-slider__label--left">{{ leftEdgeLabel }}</span>
      <span class="range-slider__label range-slider__label--right">{{ rightEdgeLabel }}</span>
    </div>

    <!-- Трек с ползунками -->
    <div class="range-slider__track-container" ref="trackContainer" @mousedown="onTrackMouseDown">
      <div class="range-slider__track" />
      
      <!-- Отсечки -->
      <div
        v-for="(cutoffPx, idx) in cutoffPositions"
        :key="`cutoff-${idx}`"
        class="range-slider__cutoff"
        :style="{ left: cutoffPx + 'px' }"
      />
      
      <div
        v-if="isRangeMode"
        class="range-slider__range"
        :style="{ left: rangeLeft + 'px', width: rangeWidth + 'px' }"
      />

      <div
        v-if="isRangeMode"
        class="range-slider__thumb"
        :style="{ left: leftThumbPx + 'px' }"
        role="slider"
        :aria-valuemin="0"
        :aria-valuemax="maxStep"
        :aria-valuenow="leftIndex"
        tabindex="0"
        @mousedown.stop="(e) => startDrag(e, 'left')"
        @keydown.prevent="onThumbKeydown('left', $event)"
      />

      <div
        v-if="isRangeMode"
        class="range-slider__thumb"
        :style="{ left: rightThumbPx + 'px' }"
        role="slider"
        :aria-valuemin="0"
        :aria-valuemax="maxStep"
        :aria-valuenow="rightIndex"
        tabindex="0"
        @mousedown.stop="(e) => startDrag(e, 'right')"
        @keydown.prevent="onThumbKeydown('right', $event)"
      />

      <!-- Single value mode (backward compatibility) -->
      <div
        v-if="!isRangeMode"
        class="range-slider__thumb range-slider__thumb--single"
        :style="{ left: singleThumbPx + 'px' }"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="Number(modelValue as number)"
        tabindex="0"
        @mousedown.stop="startDragSingle"
        @keydown.prevent="onThumbKeydownSingle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted, watch } from 'vue';

type MaybeDate = number | Date;

interface Props {
  // If range mode + values provided, v-model is [from, to]
  modelValue: number | MaybeDate[] | Date;
  // Discrete values list for range selection
  values?: MaybeDate[];
  // Enables two-thumbs range mode
  range?: boolean;
  // Fallback numeric mode options (kept for backward compatibility)
  min?: number;
  max?: number;
  step?: number;
  minLabel?: string;
  maxLabel?: string;
  disabled?: boolean;
  // Optional formatter for labels when using values
  labelFormatter?: (v: MaybeDate) => string;
  // Cutoffs/markers to display on the slider track
  cutoffs?: number[] | MaybeDate[];
}

const props = withDefaults(defineProps<Props>(), {
  range: false,
  min: -100,
  max: 100,
  step: 1,
  minLabel: '-100%',
  maxLabel: '100%',
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'update:modelValue', value: MaybeDate[]): void;
}>();

const trackContainer = ref<HTMLElement>();
const isDragging = ref(false);
const draggingThumb = ref<'left' | 'right' | null>(null);
const trackWidth = ref(200); // default; replaced on mount with actual

// Helpers
const isRangeMode = computed(() => !!props.values?.length && props.range);
const stepsCount = computed(() => (props.values?.length ? props.values.length - 1 : 0));
const maxStep = computed(() => stepsCount.value);

const valueToLabel = (v: MaybeDate) => {
  if (props.labelFormatter) return props.labelFormatter(v);
  if (v instanceof Date) return v.toLocaleDateString();
  return String(v);
};

// Range mode state (discrete via values[])
const leftIndex = ref(0);
const rightIndex = ref(0);

const ensureIndexesFromModel = () => {
  if (!isRangeMode.value || !props.values?.length) return;
  const vals = props.values;

  const findIndex = (val: MaybeDate) => {
    const target = val instanceof Date ? val.getTime() : Number(val);
    for (let i = 0; i < vals.length; i++) {
      const cur = vals[i] instanceof Date ? (vals[i] as Date).getTime() : Number(vals[i]);
      if (cur === target) return i;
    }
    // fallback to nearest by index if exact not found
    return 0;
  };

  if (Array.isArray(props.modelValue) && props.modelValue.length === 2) {
    const [from, to] = props.modelValue as MaybeDate[];
    leftIndex.value = Math.max(0, Math.min(vals.length - 1, findIndex(from)));
    rightIndex.value = Math.max(leftIndex.value, Math.min(vals.length - 1, findIndex(to)));
  } else {
    // default full range
    leftIndex.value = 0;
    rightIndex.value = vals.length - 1;
  }
};

watch(
  () => [props.modelValue, props.values, props.range] as const,
  () => ensureIndexesFromModel(),
  { immediate: true }
);

const singleValue = computed<number>({
  get() {
    return typeof props.modelValue === 'number' ? (props.modelValue as number) : 0;
  },
  set(v: number) {
    emit('update:modelValue', v);
  },
});

// Pixel positions
const stepToPx = (step: number) => {
  return (trackWidth.value * step) / (stepsCount.value || 1);
};

const indexToPx = (index: number) => stepToPx(index);

const pxToIndex = (px: number) => {
  const raw = Math.round(((px / trackWidth.value) * (stepsCount.value || 1)));
  return Math.max(0, Math.min(stepsCount.value, raw));
};

const leftThumbPx = computed(() => Math.max(0, Math.min(trackWidth.value, indexToPx(leftIndex.value))));
const rightThumbPx = computed(() => Math.max(0, Math.min(trackWidth.value, indexToPx(rightIndex.value))));
const rangeLeft = computed(() => leftThumbPx.value);
const rangeWidth = computed(() => Math.max(0, rightThumbPx.value - leftThumbPx.value));

// Single mode positions
const singleThumbPx = computed(() => {
  const range = props.max - props.min;
  const valueOffset = singleValue.value - props.min;
  const percentage = range === 0 ? 0 : valueOffset / range;
  const pos = percentage * trackWidth.value;
  return Math.max(0, Math.min(trackWidth.value, pos));
});

// Resize handling
const updateTrackWidth = () => {
  if (trackContainer.value) {
    const rect = trackContainer.value.getBoundingClientRect();
    trackWidth.value = rect.width;
  }
};

onMounted(() => {
  updateTrackWidth();
  window.addEventListener('resize', updateTrackWidth);
});

onUnmounted(() => {
  stopDrag();
  window.removeEventListener('resize', updateTrackWidth);
});

// Drag logic
const startDrag = (event: MouseEvent, thumb: 'left' | 'right') => {
  if (props.disabled || !isRangeMode.value) return;
  isDragging.value = true;
  draggingThumb.value = thumb;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', stopDrag);
  onMouseMove(event);
};

const startDragSingle = (event: MouseEvent) => {
  if (props.disabled || isRangeMode.value) return;
  isDragging.value = true;
  draggingThumb.value = 'right'; // reuse
  document.addEventListener('mousemove', onMouseMoveSingle);
  document.addEventListener('mouseup', stopDragSingle);
  onMouseMoveSingle(event);
};

const onMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !trackContainer.value) return;
  const rect = trackContainer.value.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const newIndex = pxToIndex(offsetX);
  if (draggingThumb.value === 'left') {
    leftIndex.value = Math.min(newIndex, rightIndex.value);
  } else if (draggingThumb.value === 'right') {
    rightIndex.value = Math.max(newIndex, leftIndex.value);
  }
  emitRange();
};

const onMouseMoveSingle = (event: MouseEvent) => {
  if (!isDragging.value || !trackContainer.value) return;
  const rect = trackContainer.value.getBoundingClientRect();
  const offsetX = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
  const percentage = rect.width === 0 ? 0 : offsetX / rect.width;
  const range = props.max - props.min;
  let newValue = props.min + percentage * range;
  newValue = Math.round(newValue / props.step) * props.step;
  newValue = Math.max(props.min, Math.min(props.max, newValue));
  singleValue.value = newValue;
};

const stopDrag = () => {
  isDragging.value = false;
  draggingThumb.value = null;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', stopDrag);
};

const stopDragSingle = () => {
  isDragging.value = false;
  draggingThumb.value = null;
  document.removeEventListener('mousemove', onMouseMoveSingle);
  document.removeEventListener('mouseup', stopDragSingle);
};

// Click on track – jump nearest thumb
const onTrackMouseDown = (event: MouseEvent) => {
  if (props.disabled) return;
  updateTrackWidth();
  if (isRangeMode.value) {
    const rect = trackContainer.value!.getBoundingClientRect();
    const clickIndex = pxToIndex(event.clientX - rect.left);
    const distToLeft = Math.abs(clickIndex - leftIndex.value);
    const distToRight = Math.abs(clickIndex - rightIndex.value);
    if (distToLeft <= distToRight) {
      leftIndex.value = Math.min(clickIndex, rightIndex.value);
    } else {
      rightIndex.value = Math.max(clickIndex, leftIndex.value);
    }
    emitRange();
  } else {
    startDragSingle(event);
  }
};

// Emit range values
const emitRange = () => {
  if (!props.values) return;
  const from = props.values[leftIndex.value];
  const to = props.values[rightIndex.value];
  emit('update:modelValue', [from, to]);
};

// Keyboard support
const moveIndex = (target: 'left' | 'right', delta: number) => {
  if (!isRangeMode.value) return;
  if (target === 'left') {
    leftIndex.value = Math.max(0, Math.min(rightIndex.value, leftIndex.value + delta));
  } else {
    rightIndex.value = Math.max(leftIndex.value, Math.min(maxStep.value, rightIndex.value + delta));
  }
  emitRange();
};

const onThumbKeydown = (target: 'left' | 'right', e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') moveIndex(target, -1);
  else if (e.key === 'ArrowRight') moveIndex(target, 1);
  else if (e.key === 'Home') moveIndex(target, target === 'left' ? -maxStep.value : leftIndex.value - rightIndex.value);
  else if (e.key === 'End') moveIndex(target, target === 'right' ? maxStep.value : rightIndex.value - leftIndex.value);
};

const onThumbKeydownSingle = (e: KeyboardEvent) => {
  const step = props.step || 1;
  if (e.key === 'ArrowLeft') singleValue.value = Math.max(props.min, singleValue.value - step);
  else if (e.key === 'ArrowRight') singleValue.value = Math.min(props.max, singleValue.value + step);
};

// Labels
const leftEdgeLabel = computed(() => {
  if (isRangeMode.value && props.values?.length) return valueToLabel(props.values[0]);
  return props.minLabel;
});

const rightEdgeLabel = computed(() => {
  if (isRangeMode.value && props.values?.length) return valueToLabel(props.values[props.values.length - 1]);
  return props.maxLabel;
});

// Cutoffs
const cutoffPositions = computed(() => {
  const positions = new Set<number>();
  
  // Всегда добавляем отсечки в начале и конце
  positions.add(0);
  positions.add(trackWidth.value);
  
  if (props.cutoffs && props.cutoffs.length) {
    if (isRangeMode.value && props.values?.length) {
      // Discrete mode: find index in values array
      props.cutoffs.forEach(cutoff => {
        const target = cutoff instanceof Date ? cutoff.getTime() : Number(cutoff);
        for (let i = 0; i < props.values!.length; i++) {
          const val = props.values![i];
          const valNum = val instanceof Date ? val.getTime() : Number(val);
          if (valNum === target) {
            positions.add(indexToPx(i));
            break;
          }
        }
      });
    } else {
      // Continuous mode: convert value to pixel position
      (props.cutoffs as number[]).forEach(cutoff => {
        const range = props.max - props.min;
        const valueOffset = cutoff - props.min;
        const percentage = range === 0 ? 0 : valueOffset / range;
        const pos = percentage * trackWidth.value;
        positions.add(Math.max(0, Math.min(trackWidth.value, pos)));
      });
    }
  }
  
  return Array.from(positions).sort((a, b) => a - b);
});
</script>

<style scoped lang="scss">
.range-slider {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 280px; // Минимальная ширина для корректного отображения
}

.range-slider__labels-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
}

.range-slider__label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25em;
  color: var(--color-black);
  white-space: nowrap;
  flex-shrink: 0;
  
  &--left { 
    text-align: left;
    margin-right: 8px;
  }
  &--right { 
    text-align: right;
    margin-left: 8px;
  }
}

.range-slider__track-container {
  position: relative;
  width: 100%;
  height: 16px;
  cursor: pointer;
  flex: 1;
  margin: 0 8px;
}

.range-slider__track {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: var(--color-blue-30, #cfd7db);
  border-radius: 3px;
  transform: translateY(-50%);
}

.range-slider__range {
  position: absolute;
  top: 50%;
  height: 6px;
  background-color: var(--color-button-primary, #009639);
  border-radius: 3px;
  transform: translateY(-50%);
}

.range-slider__cutoff {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 17px;
  background-color: var(--color-blue-30, #cfd7db);
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
}

.range-slider__thumb {
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  background-color: #ffffff;
  border: 2px solid var(--color-button-primary, #009639);
  border-radius: 50%;
  cursor: grab;
  transform: translate(-50%, -50%);
  transition: box-shadow 0.1s ease, transform 0.1s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);

  &:hover { transform: translate(-50%, -50%) scale(1.05); }
  &:active { cursor: grabbing; transform: translate(-50%, -50%) scale(1.02); }
  &:focus { outline: none; box-shadow: 0 0 0 3px rgba(0, 150, 57, 0.2); }
}

.range-slider__thumb--single {
  background-color: var(--color-orange, #ed6e1c);
  border-color: var(--color-orange, #ed6e1c);
}

.range-slider--disabled {
  .range-slider__track { background-color: var(--color-grey-40, #cdcdcd); }
  .range-slider__range { background-color: var(--color-grey-40, #cdcdcd); }
  .range-slider__thumb { border-color: var(--color-grey-40, #cdcdcd); cursor: not-allowed; }
  .range-slider__label { color: var(--color-grey-40, #cdcdcd); }
}
</style>
