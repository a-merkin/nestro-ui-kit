<!-- SegmentedControl.vue -->
<template>
  <div 
    ref="containerRef" 
    class="segmented-control" 
    :class="{ 'segmented-control--disabled': props.disabled }"
  >
    <div 
      class="segmented-control__indicator"
      :style="indicatorStyle"
    ></div>
    <button
      v-for="(option, index) in props.options"
      :key="option.value"
      :ref="el => setButtonRef(el, index)"
      type="button"
      :class="[
        'segmented-control__segment',
        { 'segmented-control__segment--active': isActive(option.value) }
      ]"
      :disabled="props.disabled"
      @click="handleSelect(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';

export interface SegmentedControlOption {
  label: string;
  value: string | number;
}

interface Props {
  options: SegmentedControlOption[];
  modelValue: string | number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}>();

const containerRef = ref<HTMLElement | null>(null);
const buttonRefs = ref<(HTMLElement | null)[]>([]);
const isInitialized = ref(false);

const setButtonRef = (el: any, index: number) => {
  if (el) {
    buttonRefs.value[index] = el as HTMLElement;
  }
};

const indicatorStyle = ref({
  width: '0px',
  transform: 'translateX(0px)',
  transition: 'none',
});

const isActive = (value: string | number): boolean => {
  return value === props.modelValue;
};

const updateIndicatorPosition = () => {
  nextTick(() => {
    const activeIndex = props.options.findIndex(option => option.value === props.modelValue);
    if (activeIndex !== -1 && buttonRefs.value[activeIndex]) {
      const activeButton = buttonRefs.value[activeIndex];
      const container = containerRef.value;
      
      if (activeButton && container) {
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        indicatorStyle.value = {
          width: `${buttonRect.width}px`,
          transform: `translateX(${buttonRect.left - containerRect.left}px)`,
          transition: isInitialized.value ? 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        };
        
        // Включаем анимацию после первой установки позиции
        if (!isInitialized.value) {
          setTimeout(() => {
            isInitialized.value = true;
          }, 50);
        }
      }
    }
  });
};

const handleSelect = (value: string | number) => {
  if (!props.disabled && value !== props.modelValue) {
    emit('update:modelValue', value);
    emit('change', value);
  }
};

watch(() => props.modelValue, updateIndicatorPosition);
watch(() => props.options, updateIndicatorPosition);

onMounted(() => {
  updateIndicatorPosition();
});
</script>

<style scoped lang="scss">
.segmented-control {
  position: relative;
  display: inline-flex;
  background: #FFFFFF;
  border: 1px solid var(--color-stroke-primary, #CFD7DB);
  border-radius: 30px;
  padding: 4px;
  gap: 4px;
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.segmented-control__indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  height: calc(100% - 8px);
  background: #0F9D3B;
  border-radius: 26px;
  pointer-events: none;
  z-index: 0;
}

.segmented-control__segment {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-radius: 26px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  transition: color 0.3s ease;
  white-space: nowrap;
  min-width: fit-content;
  
  &:hover:not(:disabled):not(.segmented-control__segment--active) {
    background: rgba(244, 247, 248, 0.5);
  }
  
  &--active {
    color: #FFFFFF;
    cursor: default;
    
    &:hover {
      background: transparent;
    }
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid #0F9D3B;
    outline-offset: 2px;
  }
}

.segmented-control--disabled .segmented-control__segment {
  cursor: not-allowed;
}
</style>

