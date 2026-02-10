<template>
  <label
    class="switch"
    :class="{
      'switch--disabled': disabled,
    }"
  >
    <span v-if="$slots.before" class="switch__label switch__label--before">
      <slot name="before" />
    </span>

    <input
      v-bind="$attrs"
      type="checkbox"
      class="switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="onChange"
    />

    <span class="switch__track">
      <span class="switch__thumb" />
    </span>

    <span v-if="$slots.after || $slots.default" class="switch__label switch__label--after">
      <slot name="after">
        <slot />
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

import type { SwitchProps } from './Switch.types';

withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

const onChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.checked);
  emit('change', input.checked);
};
</script>

<style scoped lang="scss">
.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;

  &--disabled {
    cursor: not-allowed;
  }

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
  }

  &__track {
    position: relative;
    width: 26px;
    height: 6px;
    background: var(--switch-track-bg, #cfd7db);
    border-radius: 6px;
    transition: background-color 0.2s ease;
  }

  &__thumb {
    position: absolute;
    top: -3px;
    left: 0;
    width: 12px;
    height: 12px;
    background: var(--switch-thumb-bg, #009639);
    border-radius: 50%;
    transform: translateX(0);
    transition: transform 0.2s ease;
  }

  &__input:checked + &__track &__thumb {
    transform: translateX(14px);
  }

  &__input:disabled + &__track {
    opacity: 0.4;
  }

  &__label {
    font-size: 14px;
    line-height: 1.4;
    color: var(--switch-label, #000);

    &--before,
    &--after {
      cursor: inherit;
    }
  }

  &--disabled &__label {
    color: var(--switch-label-disabled, #cfd7db);
  }

  &:hover:not(&--disabled) &__track {
    opacity: 0.85;
  }

  &__input:focus-visible + &__track {
    outline: 2px solid var(--switch-focus, #009639);
    outline-offset: 2px;
  }
}
</style>
