<template>
  <label :for="inputId" class="checkbox">
    <input
      :id="inputId"
      type="checkbox"
      :checked="checked"
      :disabled="props.disabled"
      class="checkbox__input"
      @change="handleChange"
    />
    <span class="checkbox__box">
      <Icon v-if="checked" name="check" size="sm" color="white" class="checkbox__icon" />
    </span>
    <span v-if="$slots.default" class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue';
import type { CheckboxProps, CheckboxEmits } from './Checkbox.types';
import Icon from '@/components/Icon/Icon.vue';

defineOptions({ name: 'NCheckbox' });

const inputId = useId();

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  value: undefined,
});

const emit = defineEmits<CheckboxEmits>();

const isArray = computed(() => Array.isArray(props.modelValue));

const checked = computed(() => {
  if (isArray.value && props.value !== undefined) {
    return (props.modelValue as any[])?.includes(props.value);
  }
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
  gap: var(--space-2);
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
  width: var(--size-toggle-md);
  height: var(--size-toggle-md);
  border: var(--border-width-sm) solid var(--color-grey-70);
  border-radius: var(--radius-toggle-md);
  background: transparent;
  transition: all var(--duration-medium) ease;
}

.checkbox__input:checked + .checkbox__box {
  background: var(--color-green-100);
  border-color: var(--color-green-100);
}

.checkbox__input:disabled + .checkbox__box {
  background: var(--color-grey-20);
  border-color: var(--color-grey-20);
  cursor: not-allowed;
}

.checkbox__icon {
  width: var(--size-icon-sm);
  height: var(--size-icon-sm);
  color: var(--color-white);
}

.checkbox__label {
  color: var(--color-black);
}

.checkbox__input:disabled ~ .checkbox__label {
  color: var(--color-grey-40);
  cursor: not-allowed;
}
</style>
