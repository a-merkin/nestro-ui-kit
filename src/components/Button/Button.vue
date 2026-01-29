<!-- Button.vue -->
<template>
  <button :type="type" :class="buttonClasses" :disabled="disabled || loading" @click="handleClick">
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

type ButtonVariant = 'primary' | 'secondary' | 'text' | 'circle';

interface Props {
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
}

const { variant, disabled, type, loading } = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  type: 'button',
  loading: false,
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  if (!disabled) {
    emit('click', event);
  }
};

const buttonClasses = computed(() => ({
  button: true,
  [`button--${variant}`]: true,
  'button--disabled': disabled,
}));
</script>

<style scoped lang="scss">
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-xs);
  padding: var(--padding-md) 22px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  height: 50px;
}

.button--primary {
  background: var(--color-button-primary);
  color: var(--color-white);

  &:hover {
    background: var(--color-button-primary-hover);
  }

  &:active {
    background: var(--color-button-primary-pressed);
  }

  &.button--disabled {
    background: var(--color-button-primary-disabled);
    cursor: not-allowed;
    border: none;
  }
}

.button--secondary {
  background: var(--color-button-secondary);
  border: 1px solid var(--color-stroke-primary);
  color: var(--color-black);

  &:hover {
    border-color: var(--color-black);
    color: var(--color-black);
  }

  &.button--disabled {
    color: var(--color-stroke-disabled);
    cursor: not-allowed;
    border: 1px solid var(--color-stroke-disabled);
  }
}

.button--text {
  background: transparent;
  padding: var(--padding-xs);
  color: var(--color-black);

  &:hover {
    color: var(--color-button-primary);
  }
}

.button__text {
  white-space: nowrap;
}

.button--circle {
  border-radius: 50%;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: var(--color-button-primary);
    color: var(--color-white);
  }
}

.button__spinner {
  width: var(--space-6);
  height: var(--space-6);
  border: 3px solid var(--color-white);
  border-top: 3px solid var(--color-button-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-sizing: border-box;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
