<!-- Input.vue -->
<template>
  <div class="input-wrapper">
    <input
      :type="type"
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      :placeholder="placeholder"
      :disabled="disabled"
      :name="name"
      :required="required"
      :class="inputClasses"
    />
    <span v-if="error && errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  type?: 'text' | 'password' | 'email' | 'number';
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
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleFocus = () => {
  if (!disabled) {
    // Можно добавить дополнительную логику при фокусе
  }
};

const handleBlur = () => {
  if (!disabled) {
    // Можно добавить дополнительную логику при потере фокуса
  }
};

const inputClasses = computed(() => ({
  'input': true,
  'input--error': error,
  'input--disabled': disabled,
}));
</script>

<style scoped>
.input-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  min-width: 230px;
  max-width: 500px;
  height: 40px;
  padding: 0 16px;
  border-radius: 60px;
  border: 1px solid var(--color-stroke-primary, rgba(162, 177, 184, 0.51));
  background: rgba(182, 199, 207, 0.15);
  color: var(--color-text-primary);
  transition: all 0.3s ease;
  @apply .typography-label;
}

.input::placeholder {
  color: rgba(120, 151, 166, 0.6);
}

.input:focus {
  outline: none;
  border-color: var(--color-stroke-secondary);
}

.input--error {
  border-color: var(--color-stroke-error, #ED6E1C);
}

.error-message {
  color: var(--color-text-error, #ED6E1C);
  font-size: 12px;
  margin-top: 4px;
  padding-left: 16px;
}

.input--disabled {
  background: rgba(218, 218, 218, 0.15);
  border-color: rgba(225, 225, 225, 0.51);
  color: var(--color-text-disabled, #E1E1E1);
  cursor: not-allowed;
}
</style> 