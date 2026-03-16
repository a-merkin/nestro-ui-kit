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
  paddingLeft: slots.iconLeft ? 'var(--space-10)' : 'var(--size-padding-horizontal-md)',
  paddingRight: slots.iconRight ? 'var(--space-10)' : 'var(--size-padding-horizontal-md)',
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
  height: var(--size-height-md);
  padding: 0 var(--size-padding-horizontal-md);
  border-radius: var(--radius-xl);
  border: var(--border-width-sm) solid var(--color-stroke-primary);
  background: var(--color-bg-input);
  color: var(--color-black);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  transition: all var(--motion-standard);
  outline: none;
}

.input__control::placeholder {
  color: var(--color-text-placeholder);
}

.input__control:focus {
  border-color: var(--color-green-90);
}

.input__control--error {
  border-color: var(--color-stroke-error);
}

.input__control--error:focus {
  border-color: var(--color-stroke-error);
}

.input__control--disabled {
  background: var(--color-bg-input-disabled);
  border-color: var(--color-stroke-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
}

.input__icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--size-height-md);
  width: var(--size-icon-md);
  pointer-events: none;
  color: var(--color-black);
  z-index: var(--z-raised);
}

.input__icon--left {
  left: var(--space-3);
}

.input__icon--right {
  right: var(--space-3);
}

.input__icon :deep(svg) {
  width: var(--size-icon-md);
  height: var(--size-icon-md);
}

.input__error {
  margin-top: var(--space-1);
  padding-left: var(--size-padding-horizontal-md);
  font-size: var(--font-size-xs);
  color: var(--color-text-error);
}

.input__control[type='date'] {
  cursor: pointer;
}

.input__control[type='date']::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
  opacity: 0.6;
  transition: opacity var(--motion-standard);
}

.input__control[type='date']::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}
</style>
