<template>
  <label
    class="switch"
    :class="{
      'switch--disabled': disabled,
    }"
  >
    <span v-if="$slots.before || labelBefore" class="switch__label switch__label--before">
      <slot name="before">{{ labelBefore }}</slot>
    </span>

    <input
      v-bind="$attrs"
      type="checkbox"
      role="switch"
      class="switch__input"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="modelValue"
      @change="onChange"
    />

    <span class="switch__track">
      <span class="switch__thumb" />
    </span>

    <span
      v-if="$slots.after || $slots.default || labelAfter"
      class="switch__label switch__label--after"
    >
      <slot name="after">
        <slot>{{ labelAfter }}</slot>
      </slot>
    </span>
  </label>
</template>

<script setup lang="ts">
defineOptions({ name: 'NSwitch', inheritAttrs: false });

import type { SwitchProps } from './Switch.types';

withDefaults(defineProps<SwitchProps>(), {
  disabled: false,
  labelBefore: undefined,
  labelAfter: undefined,
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
  gap: var(--space-2);
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
    background: var(--switch-track-bg, var(--color-blue-30));
    border-radius: var(--radius-toggle-md);
    transition: background-color var(--motion-standard);
  }

  &__thumb {
    position: absolute;
    top: -3px;
    left: 0;
    width: 12px;
    height: 12px;
    background: var(--switch-thumb-bg, var(--color-green-90));
    border-radius: var(--radius-round);
    transform: translateX(0);
    transition: transform var(--motion-standard);
  }

  &__input:checked + &__track &__thumb {
    transform: translateX(14px);
  }

  &__input:disabled + &__track {
    opacity: 0.4;
  }

  &__label {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-sm);
    color: var(--switch-label, var(--color-black));

    &--before,
    &--after {
      cursor: inherit;
    }
  }

  &--disabled &__label {
    color: var(--switch-label-disabled, var(--color-blue-30));
  }

  &:hover:not(&--disabled) &__track {
    opacity: 0.85;
  }

  &__input:focus-visible + &__track {
    outline: 2px solid var(--switch-focus, var(--color-green-90));
    outline-offset: 2px;
  }
}
</style>
