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
  gap: var(--space-3);
}

.radio-group--horizontal {
  flex-direction: row;
  align-items: center;
  gap: var(--space-4);
}

.radio-group__label {
  color: var(--color-grey-70);
  font-size: var(--font-size-sm);
  line-height: 1.2;
}

.radio-group__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.radio-group--horizontal .radio-group__items {
  flex-direction: row;
  gap: var(--space-6);
}

.radio-group__item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
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
  inline-size: var(--size-toggle-sm);
  block-size: var(--size-toggle-sm);
  border: 2px solid var(--color-blue-50);
  border-radius: var(--radius-round);
  background: transparent;
  transition:
    border-color var(--motion-standard),
    background-color var(--motion-standard);
  flex-shrink: 0;
}

.radio-group__input:checked + .radio-group__control {
  border-color: var(--color-green-90);
  background: var(--color-green-90);
}

.radio-group__input:disabled + .radio-group__control {
  border-color: var(--color-grey-20);
  background: var(--color-grey-50);
}

.radio-group__input:disabled:checked + .radio-group__control {
  border-color: var(--color-grey-20);
  background: var(--color-grey-20);
}

.radio-group__text {
  color: var(--color-black);
  line-height: 1.4;
}

.radio-group__item--disabled .radio-group__text {
  color: var(--color-grey-20);
}

.radio-group__item:hover:not(.radio-group__item--disabled) .radio-group__control {
  border-color: var(--color-green-90);
}
</style>
