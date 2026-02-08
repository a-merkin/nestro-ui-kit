<template>
  <div class="input-wrapper">
    <div class="input-container">
      <div v-if="$slots.iconLeft" class="input-icon input-icon--left">
        <slot name="iconLeft"></slot>
      </div>
      <input
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
        :required="required"
        :class="inputClasses"
        :style="inputStyles"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div v-if="$slots.iconRight" class="input-icon input-icon--right">
        <slot name="iconRight"></slot>
      </div>
    </div>
    <span v-if="error && errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue';

defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'date';
  name?: string;
  required?: boolean;
}

const { type, disabled, error, required } = withDefaults(defineProps<Props>(), {
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

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('change', target.value);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const inputClasses = computed(() => ({
  input: true,
  'input--error': error,
  'input--disabled': disabled,
}));

const inputStyles = computed(() => {
  const paddingLeft = slots.iconLeft ? 'var(--space-11)' : 'var(--padding-md)';
  const paddingRight = slots.iconRight ? 'var(--space-11)' : 'var(--padding-md)';
  return {
    paddingLeft,
    paddingRight,
  };
});
</script>

<style scoped>
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.input-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 230px;
}

.input {
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
  transition: all 0.3s ease;
  outline: none;
}

.input::placeholder {
  color: rgba(120, 151, 166, 0.6);
}

.input-icon {
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

.input-icon--left {
  left: var(--space-3);
}

.input-icon--right {
  right: var(--space-3);
}

.input-icon :deep(svg) {
  width: var(--space-5);
  height: var(--space-5);
}

.input--error {
  border-color: var(--color-stroke-error, #ed6e1c);
}

.error-message {
  color: var(--color-text-error, #ed6e1c);
  font-size: 12px;
  margin-top: var(--space-1);
  padding-left: var(--padding-md);
}

.input--disabled {
  background: rgba(218, 218, 218, 0.15);
  border-color: rgba(225, 225, 225, 0.51);
  color: var(--color-text-disabled, #e1e1e1);
  cursor: not-allowed;
}

/* Стили для input type="date" */
.input[type='date'] {
  cursor: pointer;
}

.input[type='date']::-webkit-calendar-picker-indicator {
  cursor: pointer;
  filter: invert(0.5);
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.input[type='date']::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

.input[type='date']::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

.input[type='date']::-webkit-datetime-edit {
  padding: 0;
}

.input[type='date']::-webkit-datetime-edit-text {
  padding: 0 2px;
}

.input[type='date']::-webkit-datetime-edit-month-field,
.input[type='date']::-webkit-datetime-edit-day-field,
.input[type='date']::-webkit-datetime-edit-year-field {
  padding: 0 2px;
  font-family: var(--font-family-base, 'Montserrat', sans-serif);
  font-size: 16px;
  font-weight: 400;
}
</style>
