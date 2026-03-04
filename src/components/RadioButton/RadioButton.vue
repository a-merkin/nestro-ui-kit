<template>
  <label class="radio" :class="{ 'radio--disabled': disabled }">
    <input
      v-bind="$attrs"
      type="radio"
      class="radio__input"
      :checked="isChecked"
      :disabled="disabled"
      :value="value"
      :name="name"
      @change="handleChange"
    />

    <span class="radio__control" />

    <span v-if="$slots.default || label" class="radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RadioButtonProps, RadioValue } from './RadioButton.types';

defineOptions({
  name: 'NRadioButton',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<RadioButtonProps>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: RadioValue): void;
}>();

const isChecked = computed(() => props.modelValue === props.value);

const handleChange = () => {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
  }
};
</script>

<style scoped>
.radio {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;
}

.radio--disabled {
  cursor: not-allowed;
}

.radio__input {
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

.radio__control {
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

.radio__input:checked + .radio__control {
  border-color: var(--color-green-90);
  background: var(--color-green-90);
}

.radio__input:disabled + .radio__control {
  border-color: var(--color-grey-20);
  background: var(--color-grey-50);
}

.radio__input:disabled:checked + .radio__control {
  border-color: var(--color-grey-20);
  background: var(--color-grey-20);
}

.radio__label {
  color: var(--color-black);
}

.radio--disabled .radio__label {
  color: var(--color-grey-20);
}

.radio:hover:not(.radio--disabled) .radio__control {
  border-color: var(--color-green-90);
}
</style>
