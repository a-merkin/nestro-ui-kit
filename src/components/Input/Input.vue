<template>
  <div class="input">
    <div class="input__field">
      <span v-if="$slots.iconLeft" class="input__icon input__icon--left">
        <slot name="iconLeft" />
      </span>

      <input
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
        :required="required"
        class="input__control"
        :class="inputClasses"
        :style="inputStyles"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />

      <span v-if="$slots.iconRight" class="input__icon input__icon--right">
        <slot name="iconRight" />
      </span>
    </div>

    <p v-if="error && errorMessage" class="input__error">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { InputProps } from './Input.types';

defineOptions({
  name: 'NInput',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  disabled: false,
  error: false,
  required: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

const slots = useSlots();

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

const onChange = (e: Event) => {
  emit('change', (e.target as HTMLInputElement).value);
};

const onFocus = (e: FocusEvent) => emit('focus', e);
const onBlur = (e: FocusEvent) => emit('blur', e);

const inputClasses = computed(() => ({
  'input__control--error': props.error,
  'input__control--disabled': props.disabled,
}));

const inputStyles = computed(() => ({
  paddingLeft: slots.iconLeft ? 'var(--space-11)' : 'var(--padding-md)',
  paddingRight: slots.iconRight ? 'var(--space-11)' : 'var(--padding-md)',
}));
</script>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
}

.input__field {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 230px;
}

.input__control {
  width: 100%;
  height: var(--space-10);
  padding: 0 var(--padding-md);
  border-radius: 60px;
  border: 1px solid var(--color-stroke-primary, rgba(162, 177, 184, 0.51));
  background: rgba(182, 199, 207, 0.15);
  color: var(--color-text-primary);
  font-family: var(--font-family-base, 'Montserrat', sans-serif);
  font-size: 16px;
  font-weight: 400;
  transition: all 0.2s ease;
  outline: none;
}

.input__control::placeholder {
  color: rgba(120, 151, 166, 0.6);
}

.input__control--error {
  border-color: var(--color-stroke-error, #ed6e1c);
}

.input__control--disabled {
  background: rgba(218, 218, 218, 0.15);
  border-color: rgba(225, 225, 225, 0.51);
  color: var(--color-text-disabled, #e1e1e1);
  cursor: not-allowed;
}

.input__icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--space-10);
  width: var(--space-5);
  pointer-events: none;
  color: var(--color-text-primary);
  z-index: 2;
}

.input__icon--left {
  left: var(--space-3);
}

.input__icon--right {
  right: var(--space-3);
}

.input__icon :deep(svg) {
  width: var(--space-5);
  height: var(--space-5);
}

.input__error {
  margin-top: var(--space-1);
  padding-left: var(--padding-md);
  font-size: 12px;
  color: var(--color-text-error, #ed6e1c);
}

.input__control[type='date'] {
  cursor: pointer;
}

.input__control[type='date']::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.input__control[type='date']::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
