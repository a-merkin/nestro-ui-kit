<!-- RadioButton.vue -->
<template>
  <label class="radio">
    <input
      type="radio"
      :checked="checked"
      :disabled="disabled"
      :value="value"
      :name="name"
      class="radio__input"
      @change="handleChange"
    />
    <span class="radio__circle"></span>
    <span v-if="$slots.default || label" class="radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
interface Props {
  value: string | number;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  label?: string;
}

const { checked, disabled, value, name, label } = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
  name: '',
  label: '',
});

const emit = defineEmits<{
  (e: 'change', value: string | number): void;
}>();

const handleChange = () => {
  if (!disabled) {
    emit('change', value);
  }
};
</script>

<style scoped lang="scss">
.radio {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.radio__input {
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

.radio__circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 2px solid #AABDC7;
  border-radius: 50%;
  background: transparent;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.radio__input:checked + .radio__circle {
  border-color: #0F9D3B;
  background: #0F9D3B;
}

.radio__input:disabled + .radio__circle {
  border-color: #D9D9D9;
  background: #F9F9F9;
  cursor: not-allowed;
}

.radio__input:disabled:checked + .radio__circle {
  border-color: #D9D9D9;
  background: #D9D9D9;
}

.radio__label {
  color: #000000;
  font-size: 14px;
  line-height: 1.4;
}

.radio__input:disabled ~ .radio__label {
  color: #D9D9D9;
  cursor: not-allowed;
}

.radio:hover:not(:has(.radio__input:disabled)) .radio__circle {
  border-color: #0F9D3B;
}
</style>
