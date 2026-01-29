<!-- Checkbox.vue -->
<template>
  <label class="checkbox">
    <input
      v-bind="$attrs"
      type="checkbox"
      :checked="isChecked"
      :disabled="props.disabled"
      class="checkbox__input"
      @change="handleChange"
    />
    <span class="checkbox__box">
      <svg
        v-if="isChecked"
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

defineOptions({
  inheritAttrs: false,
});

interface Props {
  modelValue: boolean | any[];
  value?: any;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  value: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | any[]): void;
}>();

// Определяем, работаем ли мы с массивом
const isArray = computed(() => Array.isArray(props.modelValue));

// Вычисляем состояние чекбокса
const isChecked = computed(() => {
  if (isArray.value && props.value !== undefined) {
    return (props.modelValue as any[]).includes(props.value);
  }
  return props.modelValue as boolean;
});

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (isArray.value && props.value !== undefined) {
    // Режим массива
    const newValue = [...(props.modelValue as any[])];
    if (target.checked) {
      // Добавляем значение, если его еще нет
      if (!newValue.includes(props.value)) {
        newValue.push(props.value);
      }
    } else {
      // Удаляем значение
      const index = newValue.indexOf(props.value);
      if (index > -1) {
        newValue.splice(index, 1);
      }
    }
    emit('update:modelValue', newValue);
  } else {
    // Режим boolean
    emit('update:modelValue', target.checked);
  }
};
</script>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--gap-xs);
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
  width: var(--space-5);
  height: var(--space-5);
  border: 1px solid var(--color-icon-stroke-secondary);
  border-radius: 2px;
  background: transparent;
  transition: all 0.3s ease;
}

.checkbox__input:checked + .checkbox__box {
  background: var(--color-button-primary);
  border-color: var(--color-button-primary);
}

.checkbox__input:disabled + .checkbox__box {
  background: var(--color-stroke-disabled);
  border-color: var(--color-stroke-disabled);
  cursor: not-allowed;
}

.checkbox__icon {
  width: 14px;
  height: 14px;
  color: var(--color-white);
}

.checkbox__label {
  color: var(--color-text-primary);
}

.checkbox__input:disabled ~ .checkbox__label {
  color: var(--color-stroke-disabled);
  cursor: not-allowed;
}
</style>
