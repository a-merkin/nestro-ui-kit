<!-- SegmentedControl.vue -->
<template>
  <div class="segmented-control" :class="{ 'segmented-control--disabled': disabled }">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="[
        'segmented-control__segment',
        { 'segmented-control__segment--active': isActive(option.value) }
      ]"
      :disabled="disabled"
      @click="handleSelect(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
export interface SegmentedControlOption {
  label: string;
  value: string | number;
}

interface Props {
  options: SegmentedControlOption[];
  modelValue: string | number;
  disabled?: boolean;
}

const { options, modelValue, disabled } = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}>();

const isActive = (value: string | number): boolean => {
  return value === modelValue;
};

const handleSelect = (value: string | number) => {
  if (!disabled && value !== modelValue) {
    emit('update:modelValue', value);
    emit('change', value);
  }
};
</script>

<style scoped lang="scss">
.segmented-control {
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

.segmented-control__segment {
  flex: 1;
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-radius: 26px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: fit-content;
  
  &:hover:not(:disabled):not(.segmented-control__segment--active) {
    background: #F4F7F8;
  }
  
  &--active {
    background: #0F9D3B;
    color: #FFFFFF;
    cursor: default;
    
    &:hover {
      background: #0F9D3B;
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

