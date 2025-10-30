<!-- RadioGroup.vue -->
<template>
  <div class="radio-group" :class="{ 'radio-group--horizontal': props.direction === 'horizontal' }">
    <label v-if="props.label" class="radio-group__title">{{ props.label }}</label>
    <div class="radio-group__items">
      <label
        v-for="option in props.options"
        :key="option.value"
        class="radio-group__item"
        :class="{ 'radio-group__item--disabled': props.disabled }"
      >
        <input
          type="radio"
          :value="option.value"
          :checked="option.value === props.modelValue"
          :disabled="props.disabled"
          :name="groupName"
          class="radio-group__input"
          @change="handleChange(option.value)"
        />
        <span class="radio-group__circle"></span>
        <span class="radio-group__label">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
let uniqueId = 0;
const generateId = () => `radio-group-${++uniqueId}-${Date.now()}`;

export interface RadioGroupOption {
  label: string;
  value: string | number;
}

interface Props {
  modelValue: string | number;
  options: RadioGroupOption[];
  name?: string;
  label?: string;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
}

const props = withDefaults(defineProps<Props>(), {
  name: '',
  label: '',
  disabled: false,
  direction: 'vertical',
});

// Генерируем уникальное имя для группы, если не задано
const groupName = props.name || generateId();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
}>();

const handleChange = (value: string | number) => {
  if (!props.disabled) {
    emit('update:modelValue', value);
    emit('change', value);
  }
};
</script>

<style scoped lang="scss">
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  &--horizontal {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
  
  &--horizontal &__items {
    flex-direction: row;
    gap: 24px;
  }
}

.radio-group__title {
  color: var(--color-text-tertiary, #464E56);
  font-size: 16px;
  font-weight: 400;
  line-height: 1.219;
  margin-bottom: 4px;
}

.radio-group__items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-group__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  
  &--disabled {
    cursor: not-allowed;
  }
}

.radio-group__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.radio-group__circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 2px solid #AABDC7;
  border-radius: 50%;
  background: transparent;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.radio-group__input:checked + .radio-group__circle {
  border-color: #0F9D3B;
  background: #0F9D3B;
}

.radio-group__input:disabled + .radio-group__circle {
  border-color: #D9D9D9;
  background: #F9F9F9;
}

.radio-group__input:disabled:checked + .radio-group__circle {
  border-color: #D9D9D9;
  background: #D9D9D9;
}

.radio-group__label {
  color: #000000;
  font-size: 14px;
  line-height: 1.4;
}

.radio-group__input:disabled ~ .radio-group__label {
  color: #D9D9D9;
}

.radio-group__item:hover:not(.radio-group__item--disabled) .radio-group__circle {
  border-color: #0F9D3B;
}
</style>

