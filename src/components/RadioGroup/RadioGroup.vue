<template>
  <div
    class="radio-group"
    :class="[`radio-group--${direction}`, { 'radio-group--disabled': disabled }]"
  >
    <div v-if="label" class="radio-group__label">
      {{ label }}
    </div>

    <div class="radio-group__items">
      <label
        v-for="option in options"
        :key="option.value"
        class="radio-group__item"
        :class="{
          'radio-group__item--checked': option.value === modelValue,
          'radio-group__item--disabled': disabled || option.disabled,
        }"
      >
        <input
          type="radio"
          class="radio-group__input"
          :name="groupName"
          :value="option.value"
          :checked="option.value === modelValue"
          :disabled="disabled || option.disabled"
          @change="onChange(option.value)"
        />

        <span class="radio-group__control" />

        <span class="radio-group__text">
          {{ option.label }}
        </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue';
import type { RadioGroupProps, RadioGroupValue } from './RadioGroup.types';

defineOptions({ name: 'NRadioGroup' });

const props = withDefaults(defineProps<RadioGroupProps>(), {
  disabled: false,
  direction: 'vertical',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: RadioGroupValue): void;
}>();

const instance = getCurrentInstance();
const autoName = `radio-group-${instance?.uid ?? Math.random().toString(36).slice(2)}`;
const groupName = computed(() => props.name || autoName);

const onChange = (value: RadioGroupValue) => {
  if (!props.disabled) {
    emit('update:modelValue', value);
  }
};
</script>

<style scoped>
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-group--horizontal {
  flex-direction: row;
  align-items: center;
  gap: 16px;
}

.radio-group__label {
  color: var(--color-text-tertiary, #464e56);
  font-size: 16px;
  line-height: 1.2;
}

.radio-group__items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-group--horizontal .radio-group__items {
  flex-direction: row;
  gap: 24px;
}

.radio-group__item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.radio-group__item--disabled {
  cursor: not-allowed;
}

.radio-group__input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
  padding: 0;
}

.radio-group__control {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 16px;
  block-size: 16px;
  border: 2px solid #aabdc7;
  border-radius: 50%;
  background: transparent;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
  flex-shrink: 0;
}

.radio-group__input:checked + .radio-group__control {
  border-color: #0f9d3b;
  background: #0f9d3b;
}

.radio-group__input:disabled + .radio-group__control {
  border-color: #d9d9d9;
  background: #f9f9f9;
}

.radio-group__input:disabled:checked + .radio-group__control {
  border-color: #d9d9d9;
  background: #d9d9d9;
}

.radio-group__text {
  color: #000;
  line-height: 1.4;
}

.radio-group__item--disabled .radio-group__text {
  color: #d9d9d9;
}

.radio-group__item:hover:not(.radio-group__item--disabled) .radio-group__control {
  border-color: #0f9d3b;
}
</style>
