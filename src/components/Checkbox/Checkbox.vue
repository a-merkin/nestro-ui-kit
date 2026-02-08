<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="checked"
      :disabled="props.disabled"
      class="checkbox__input"
      @change="handleChange"
    />
    <span class="checkbox__box">
      <svg
        v-if="checked"
        class="checkbox__icon"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6667 3.5L5.25 9.91667L2.33333 7"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span v-if="$slots.default" class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CheckboxProps, CheckboxEmits } from './Checkbox.types';

defineOptions({ name: 'NCheckbox' });

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  value: undefined,
});

const emit = defineEmits<CheckboxEmits>();

const isArray = computed(() => Array.isArray(props.modelValue));

// вычисляем, отмечен ли чекбокс
const checked = computed(() => {
  if (isArray.value && props.value !== undefined) {
    return (props.modelValue as any[])?.includes(props.value);
  }
  // Если modelValue не передан, галочка по умолчанию
  return props.modelValue !== false;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.checked;

  if (props.modelValue === undefined) return;

  if (isArray.value && props.value !== undefined) {
    const newValue = [...(props.modelValue as any[])];
    value
      ? !newValue.includes(props.value) && newValue.push(props.value)
      : newValue.includes(props.value) && newValue.splice(newValue.indexOf(props.value), 1);
    emit('update:modelValue', newValue);
  } else {
    emit('update:modelValue', value);
  }
};
</script>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.checkbox__input {
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

.checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 1px solid #6f6f6f;
  border-radius: 2px;
  background: transparent;
  transition: all 0.3s ease;
}

.checkbox__input:checked + .checkbox__box {
  background: #4caf50;
  border-color: #4caf50;
}

.checkbox__input:disabled + .checkbox__box {
  background: #e1e1e1;
  border-color: #e1e1e1;
  cursor: not-allowed;
}

.checkbox__icon {
  width: 14px;
  height: 14px;
  color: #ffffff;
}

.checkbox__label {
  color: #000000;
}

.checkbox__input:disabled ~ .checkbox__label {
  color: #e1e1e1;
  cursor: not-allowed;
}
</style>
