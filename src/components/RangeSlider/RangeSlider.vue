<!-- RangeSlider.vue -->
<template>
  <div class="range-slider">
    <span class="range-slider__label range-slider__label--left">{{ minLabel }}</span>
    <div class="range-slider__track-container" ref="trackContainer">
      <div class="range-slider__track" />
      <div
        class="range-slider__thumb"
        :style="{ left: thumbPosition + 'px' }"
        @mousedown="startDrag"
      />
    </div>
    <span class="range-slider__label range-slider__label--right">{{ maxLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue';

interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  step?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  min: -100,
  max: 100,
  minLabel: '-100%',
  maxLabel: '100%',
  step: 1,
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const trackContainer = ref<HTMLElement>();
const isDragging = ref(false);
const trackWidth = 200; // Ширина трека согласно дизайну

// Вычисляем позицию ползунка
const thumbPosition = computed(() => {
  const range = props.max - props.min;
  const valueOffset = props.modelValue - props.min;
  const percentage = valueOffset / range;
  return percentage * trackWidth - 6; // -6 для центрирования ползунка (12px / 2)
});

const startDrag = (event: MouseEvent) => {
  if (props.disabled) return;

  isDragging.value = true;
  updateValue(event);

  document.addEventListener('mousemove', updateValue);
  document.addEventListener('mouseup', stopDrag);

  event.preventDefault();
};

const updateValue = (event: MouseEvent) => {
  if (!isDragging.value || !trackContainer.value || props.disabled) return;

  const rect = trackContainer.value.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percentage = Math.max(0, Math.min(1, offsetX / trackWidth));

  const range = props.max - props.min;
  let newValue = props.min + percentage * range;

  // Применяем step
  newValue = Math.round(newValue / props.step) * props.step;

  // Ограничиваем значение в пределах min/max
  newValue = Math.max(props.min, Math.min(props.max, newValue));

  emit('update:modelValue', newValue);
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', updateValue);
  document.removeEventListener('mouseup', stopDrag);
};

onUnmounted(() => {
  stopDrag();
});
</script>

<style scoped lang="scss">
.range-slider {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.range-slider__label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.25em;
  color: var(--color-black);
  width: 40px;
  text-align: center;

  &--left {
    text-align: left;
  }

  &--right {
    text-align: right;
  }
}

.range-slider__track-container {
  position: relative;
  width: 200px;
  height: 12px;
  cursor: pointer;
}

.range-slider__track {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: var(--color-blue-30, #cfd7db);
  border-radius: 2.5px;
  transform: translateY(-50%);
}

.range-slider__thumb {
  position: absolute;
  top: 0;
  width: 12px;
  height: 12px;
  background-color: var(--color-orange, #ed6e1c);
  border-radius: 50%;
  cursor: grab;
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    cursor: grabbing;
    transform: scale(1.05);
  }
}

.range-slider--disabled {
  .range-slider__track {
    background-color: var(--color-grey-40, #cdcdcd);
  }

  .range-slider__thumb {
    background-color: var(--color-grey-40, #cdcdcd);
    cursor: not-allowed;

    &:hover {
      transform: none;
    }
  }

  .range-slider__label {
    color: var(--color-grey-40, #cdcdcd);
  }
}
</style>
