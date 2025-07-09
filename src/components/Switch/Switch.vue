<!-- Switch.vue -->
<template>
  <label class="switch">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="handleChange"
      :disabled="disabled"
      class="switch__input"
    />
    <span class="switch__track">
      <span class="switch__thumb"></span>
    </span>
    <span v-if="$slots.default" class="switch__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean;
  disabled?: boolean;
}

const { modelValue, disabled } = withDefaults(defineProps<Props>(), {
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
.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.switch__input {
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

.switch__track {
  position: relative;
  display: inline-block;
  width: 26px;
  height: 6px;
  background: #cfd7db;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.switch__thumb {
  position: absolute;
  top: -3px;
  left: 0;
  width: 12px;
  height: 12px;
  background: #009639;
  border-radius: 50%;
  transition: transform 0.3s ease;
  transform: translateX(0);
}

.switch__input:checked + .switch__track .switch__thumb {
  transform: translateX(14px);
}

.switch__input:disabled + .switch__track {
  opacity: 0.4;
  cursor: not-allowed;
}

.switch__input:disabled + .switch__track .switch__thumb {
  cursor: not-allowed;
}

.switch__label {
  color: #000000;
  font-size: 14px;
  line-height: 1.4;
}

.switch__input:disabled ~ .switch__label {
  color: #cfd7db;
  cursor: not-allowed;
}

.switch:hover:not(:has(.switch__input:disabled)) .switch__track {
  opacity: 0.8;
}
</style>
