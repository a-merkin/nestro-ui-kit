<template>
  <div class="range-slider" :class="{ 'range-slider--disabled': disabled }">
    <div class="range-slider__labels-row">
      <span class="range-slider__label range-slider__label--left">{{ leftLabel }}</span>
      <span class="range-slider__label range-slider__label--right">{{ rightLabel }}</span>
    </div>

    <div ref="track" class="range-slider__track-container" @mousedown="onTrackClick">
      <div class="range-slider__track" />

      <div
        v-for="(px, idx) in cutoffPositions"
        :key="idx"
        class="range-slider__cutoff"
        :style="{ left: px + 'px' }"
      />

      <div
        v-if="isRange"
        class="range-slider__range"
        :style="{ left: leftPx + 'px', width: widthPx + 'px' }"
      />

      <div v-if="isRange" class="range-slider__thumb-wrapper" :style="{ left: leftPx + 'px' }">
        <div
          class="range-slider__tooltip"
          :class="{ 'range-slider__tooltip--visible': leftTooltipVisible }"
        >
          {{ values[leftIndex] }}
        </div>
        <div
          class="range-slider__thumb"
          role="slider"
          :aria-valuemin="0"
          :aria-valuemax="maxIndex"
          :aria-valuenow="leftIndex"
          tabindex="0"
          @mousedown.stop="startDrag('left', $event)"
          @mouseenter="leftHovered = true"
          @mouseleave="leftHovered = false"
        />
      </div>

      <div v-if="isRange" class="range-slider__thumb-wrapper" :style="{ left: rightPx + 'px' }">
        <div
          class="range-slider__tooltip"
          :class="{ 'range-slider__tooltip--visible': rightTooltipVisible }"
        >
          {{ values[rightIndex] }}
        </div>
        <div
          class="range-slider__thumb"
          role="slider"
          :aria-valuemin="0"
          :aria-valuemax="maxIndex"
          :aria-valuenow="rightIndex"
          tabindex="0"
          @mousedown.stop="startDrag('right', $event)"
          @mouseenter="rightHovered = true"
          @mouseleave="rightHovered = false"
        />
      </div>

      <div v-if="!isRange" class="range-slider__thumb-wrapper" :style="{ left: singlePx + 'px' }">
        <div
          class="range-slider__tooltip"
          :class="{ 'range-slider__tooltip--visible': singleTooltipVisible }"
        >
          {{ values[singleIndex] }}
        </div>
        <div
          class="range-slider__thumb range-slider__thumb--single"
          role="slider"
          :aria-valuemin="0"
          :aria-valuemax="maxIndex"
          :aria-valuenow="singleIndex"
          tabindex="0"
          @mousedown.stop="startDragSingle"
          @mouseenter="singleHovered = true"
          @mouseleave="singleHovered = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { RangeSliderProps, RangeSliderEmit } from './RangeSlider.types';

defineOptions({ name: 'NRangeSlider' });

const props = defineProps<RangeSliderProps>();
const emit = defineEmits<RangeSliderEmit>();

const values = computed(() => props.values ?? []);
const cutoffs = computed(() => props.cutoffs ?? []);
const disabled = computed(() => props.disabled ?? false);
const minLabel = computed(() => props.minLabel ?? '');
const maxLabel = computed(() => props.maxLabel ?? '');

const track = ref<HTMLElement | null>(null);
const trackWidth = ref(200);
const isDragging = ref(false);
const dragging = ref<'left' | 'right' | null>(null);

const leftHovered = ref(false);
const rightHovered = ref(false);
const singleHovered = ref(false);

const leftTooltipVisible = computed(
  () => leftHovered.value || (isDragging.value && dragging.value === 'left')
);
const rightTooltipVisible = computed(
  () => rightHovered.value || (isDragging.value && dragging.value === 'right')
);
const singleTooltipVisible = computed(
  () => singleHovered.value || (isDragging.value && !isRange.value)
);

const isRange = computed(() => Array.isArray(props.modelValue));
const leftIndex = ref(0);
const rightIndex = ref(0);
const singleIndex = ref(0);
const maxIndex = computed(() => Math.max(values.value.length - 1, 0));

watch(
  () => props.modelValue,
  (val) => {
    if (!values.value.length) return;

    if (Array.isArray(val)) {
      leftIndex.value = Math.max(0, values.value.indexOf(val[0]));
      rightIndex.value = Math.max(leftIndex.value, values.value.indexOf(val[1]));
    } else if (typeof val === 'number') {
      const idx = values.value.indexOf(val);
      if (idx >= 0) singleIndex.value = idx;
    }
  },
  { immediate: true }
);

const indexToPx = (i: number) => (trackWidth.value * i) / Math.max(maxIndex.value, 1);

const pxToIndex = (px: number) => Math.round((px / trackWidth.value) * Math.max(maxIndex.value, 1));

const leftPx = computed(() => indexToPx(leftIndex.value));
const rightPx = computed(() => indexToPx(rightIndex.value));
const widthPx = computed(() => rightPx.value - leftPx.value);
const singlePx = computed(() => indexToPx(singleIndex.value));

const leftLabel = computed(() => values.value[leftIndex.value] ?? minLabel.value);
const rightLabel = computed(() => values.value[rightIndex.value] ?? maxLabel.value);

const cutoffPositions = computed(() => cutoffs.value.map((i) => indexToPx(i)));

const updateTrackWidth = () => {
  if (track.value) trackWidth.value = track.value.getBoundingClientRect().width;
};

onMounted(() => {
  updateTrackWidth();
  window.addEventListener('resize', updateTrackWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateTrackWidth);
  stopDrag();
  stopDragSingle();
});

const startDrag = (thumb: 'left' | 'right', e: MouseEvent) => {
  if (disabled.value || !isRange.value) return;
  isDragging.value = true;
  dragging.value = thumb;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', stopDrag);
  onMouseMove(e);
};

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !track.value) return;
  const rect = track.value.getBoundingClientRect();
  const idx = Math.max(0, Math.min(maxIndex.value, pxToIndex(e.clientX - rect.left)));

  if (dragging.value === 'left') leftIndex.value = Math.min(idx, rightIndex.value);
  else if (dragging.value === 'right') rightIndex.value = Math.max(idx, leftIndex.value);

  emitRange();
};

const stopDrag = () => {
  isDragging.value = false;
  dragging.value = null;
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', stopDrag);
  emitRange();
};

const startDragSingle = (e: MouseEvent) => {
  if (disabled.value || isRange.value) return;
  isDragging.value = true;
  document.addEventListener('mousemove', onMouseMoveSingle);
  document.addEventListener('mouseup', stopDragSingle);
  onMouseMoveSingle(e);
};

const onMouseMoveSingle = (e: MouseEvent) => {
  if (!isDragging.value || !track.value) return;
  const rect = track.value.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  singleIndex.value = Math.round(ratio * maxIndex.value);
  emit('update:modelValue', values.value[singleIndex.value]);
};

const stopDragSingle = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onMouseMoveSingle);
  document.removeEventListener('mouseup', stopDragSingle);
};

const onTrackClick = (e: MouseEvent) => {
  if (!track.value) return;
  const rect = track.value.getBoundingClientRect();
  const idx = Math.max(0, Math.min(maxIndex.value, pxToIndex(e.clientX - rect.left)));

  if (isRange.value) {
    const dL = Math.abs(idx - leftIndex.value);
    const dR = Math.abs(idx - rightIndex.value);
    if (dL <= dR) leftIndex.value = Math.min(idx, rightIndex.value);
    else rightIndex.value = Math.max(idx, leftIndex.value);
    emitRange();
  } else {
    singleIndex.value = idx;
    emit('update:modelValue', values.value[idx]);
  }
};

const emitRange = () => {
  if (!values.value.length) return;
  emit('update:modelValue', [values.value[leftIndex.value], values.value[rightIndex.value]]);
};
</script>

<style scoped lang="scss">
.range-slider {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.range-slider__labels-row {
  display: flex;
  justify-content: space-between;
}

.range-slider__track-container {
  position: relative;
  height: var(--size-toggle-sm);
  margin: 0 var(--space-2);
  overflow: visible;
}

.range-slider__track {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: var(--color-blue-30);
  border-radius: var(--border-width-lg);
  transform: translateY(-50%);
}

.range-slider__range {
  position: absolute;
  top: 50%;
  height: 6px;
  background-color: var(--color-green-90);
  border-radius: var(--border-width-lg);
  transform: translateY(-50%);
}

.range-slider__cutoff {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 17px;
  background-color: var(--color-blue-30);
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.range-slider__thumb-wrapper {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

.range-slider__tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: var(--space-2);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-grey-70);
  color: var(--color-white);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  border-radius: var(--radius-sm);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--motion-standard);

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: var(--space-1);
    border-style: solid;
    border-color: var(--color-grey-70) transparent transparent transparent;
  }
}

.range-slider__tooltip--visible {
  opacity: 1;
}

.range-slider__thumb {
  width: var(--size-toggle-sm);
  height: var(--size-toggle-sm);
  background: var(--color-white);
  border: var(--border-width-md) solid var(--color-green-90);
  border-radius: var(--radius-round);
  cursor: grab;
}

.range-slider__thumb--single {
  background-color: var(--color-orange);
  border-color: var(--color-orange);
}

.range-slider--disabled .range-slider__thumb {
  cursor: not-allowed;
  border-color: var(--color-grey-40);
}
</style>
