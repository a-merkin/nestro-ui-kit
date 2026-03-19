<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="handleClick"
  >
    <template v-if="loading">
      <span class="button__spinner" />
    </template>

    <template v-else>
      <slot v-if="$slots['icon-left']" name="icon-left" />
      <span v-if="$slots.default" class="button__text">
        <slot />
      </span>
      <slot v-if="$slots['icon-right']" name="icon-right" />
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps, ButtonEmits } from './Button.types';

defineOptions({ name: 'NButton' });

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  disabled: false,
  type: 'button',
  loading: false,
});

const emit = defineEmits<ButtonEmits>();

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;
  emit('click', event);
};

const buttonClasses = computed(() => ({
  button: true,
  [`button--${props.variant}`]: true,
  'button--disabled': props.disabled || props.loading,
}));
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  height: var(--size-height-md);
  padding: 0 var(--size-padding-horizontal-md);
  min-width: var(--size-min-width-md);

  border-radius: var(--radius-xl);
  border: var(--border-width-sm) solid transparent;

  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);

  cursor: pointer;
  transition:
    background-color var(--motion-standard),
    color var(--motion-standard),
    border-color var(--motion-standard);
}

.button--primary {
  background-color: var(--color-green-90);
  color: var(--color-white);

  &:hover:not(.button--disabled) {
    background-color: var(--color-green-80);
  }

  &:active:not(.button--disabled) {
    background-color: var(--color-green-100);
  }

  &.button--disabled {
    background-color: var(--color-grey-20);
    color: var(--color-grey-80);
    cursor: not-allowed;
  }
}

.button--secondary {
  background-color: var(--color-white);
  border-color: var(--color-blue-30);
  color: var(--color-black);

  &:hover:not(.button--disabled) {
    border-color: var(--color-black);
  }

  &.button--disabled {
    border-color: var(--color-grey-20);
    color: var(--color-grey-80);
    cursor: not-allowed;
  }
}

.button--text {
  background-color: transparent;
  border-color: transparent;
  color: var(--color-black);
  padding: var(--space-2);

  &:hover:not(.button--disabled) {
    color: var(--color-green-90);
  }

  &.button--disabled {
    color: var(--color-grey-80);
    cursor: not-allowed;
  }
}

.button--circle {
  width: var(--size-height-md);
  height: var(--size-height-md);
  min-width: var(--size-height-md);
  padding: 0;
  border-radius: var(--radius-round);

  &:hover:not(.button--disabled) {
    background-color: var(--color-green-90);
    color: var(--color-white);
  }
}

.button__text {
  white-space: nowrap;
}

.button__spinner {
  width: var(--size-icon-lg);
  height: var(--size-icon-lg);
  border: var(--border-width-lg) solid var(--color-white);
  border-top: var(--border-width-lg) solid var(--color-green-90);
  border-radius: var(--radius-round);
  animation: spin 1s linear infinite;
  box-sizing: border-box;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
