<!-- Button.vue -->
<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot name="icon-left" v-if="$slots['icon-left']" />
    <span class="button__text" v-if="$slots.default">
      <slot />
    </span>
    <slot name="icon-right" v-if="$slots['icon-right']" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ButtonVariant = 'primary' | 'secondary' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

const buttonClasses = computed(() => ({
  'button': true,
  [`button--${props.variant}`]: true,
  [`button--${props.size}`]: true,
  'button--disabled': props.disabled,
}));
</script>

<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 24px;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.button--primary {
  background: #0F9D3B;
  color: #FFFFFF;
}

.button--primary:hover {
  background: #72CA94;
}

.button--primary:active {
  background: #097F2D;
}

.button--secondary {
  background: transparent;
  border: 1px solid #CFD7DB;
  color: #000000;
}

.button--secondary:hover {
  border-color: #0F9D3B;
  color: #0F9D3B;
}

.button--secondary:active {
  background: rgba(15, 157, 59, 0.1);
}

.button--text {
  background: transparent;
  padding: 8px;
  color: #000000;
}

.button--text:hover {
  color: #0F9D3B;
}

.button--disabled {
  background: #D9D9D9;
  color: rgba(0, 0, 0, 0.5);
  cursor: not-allowed;
  border: none;
}

.button--small {
  padding: 6px 16px;
  font-size: 14px;
}

.button--medium {
  padding: 8px 24px;
  font-size: 16px;
}

.button--large {
  padding: 12px 32px;
  font-size: 18px;
}

.button__text {
  white-space: nowrap;
}
</style> 