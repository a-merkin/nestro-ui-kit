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
  gap: 8px;
  padding: 16px 22px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  height: 50px;
}

.button--primary {
  background: #0f9d3b;
  color: #ffffff;

  &:hover {
    background: #72ca94;
  }

  &:active {
    background: #097f2d;
  }

  &.button--disabled {
    background: #d9d9d9;
    cursor: not-allowed;
    border: none;
  }
}

.button--secondary {
  background: #fff;
  border: 1px solid #cfd7db;
  color: #000000;

  &:hover {
    border-color: #000;
    color: #000;
  }

  &.button--disabled {
    color: #d9d9d9;
    cursor: not-allowed;
    border: 1px solid #d9d9d9;
  }
}

.button--text {
  background: transparent;
  padding: 8px;
  color: #000000;

  &:hover {
    color: #0f9d3b;
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
    background: #009639;
    color: #ffffff;
  }
}

.button__spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-top: 3px solid #0f9d3b;
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
