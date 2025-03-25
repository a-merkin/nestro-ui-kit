<!-- Checkbox.vue -->
<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled"
      class="checkbox__input"
    />
    <span class="checkbox__box">
      <svg v-if="modelValue" class="checkbox__icon" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span v-if="$slots.default" class="checkbox__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
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
  border: 1px solid #6F6F6F;
  border-radius: 2px;
  background: transparent;
  transition: all 0.3s ease;
}

.checkbox__input:checked + .checkbox__box {
  background: #4CAF50;
  border-color: #4CAF50;
}

.checkbox__input:disabled + .checkbox__box {
  background: #E1E1E1;
  border-color: #E1E1E1;
  cursor: not-allowed;
}

.checkbox__icon {
  width: 14px;
  height: 14px;
  color: #FFFFFF;
}

.checkbox__label {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 1.2;
  color: #000000;
}

.checkbox__input:disabled ~ .checkbox__label {
  color: #E1E1E1;
  cursor: not-allowed;
}
</style> 