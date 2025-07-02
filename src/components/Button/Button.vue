<!-- Button.vue -->
<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <template v-if="loading">
      <span class="button__spinner" />
    </template>
    <template v-else>
      <slot name="icon-left" v-if="$slots['icon-left']" />
      <span class="button__text" v-if="$slots.default">
        <slot />
      </span>
      <slot name="icon-right" v-if="$slots['icon-right']" />
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
  'button': true,
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
  background: #0F9D3B;
  color: #FFFFFF;

  &:hover {
    background: #72CA94;
  }

  &:active {
    background: #097F2D;
  }

  &.button--disabled {
    background: #D9D9D9;
    cursor: not-allowed;
    border: none;
  }
}

.button--secondary {
  background: #fff;
  border: 1px solid #CFD7DB;
  color: #000000;

  &:hover {
    border-color: #000;
    color: #000;
  }

  &.button--disabled {
    color: #D9D9D9;
    cursor: not-allowed;
    border: 1px solid #D9D9D9;
  }
}

.button--text {
  background: transparent;
  padding: 8px;
  color: #000000;

  &:hover {
    color: #0F9D3B;
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
    color: #FFFFFF;
  }
}

.button__spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-top: 3px solid #0F9D3B;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-sizing: border-box;
  display: inline-block;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 