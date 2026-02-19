<template>
  <component
    :is="tag"
    :class="cardClasses"
    :tabindex="clickable && !disabled ? 0 : undefined"
    role="group"
    @click="onClick"
    @keydown.enter.prevent="onKeyActivate"
    @keydown.space.prevent="onKeyActivate"
  >
    <div v-if="$slots.header" class="card__header">
      <slot name="header" />
    </div>

    <div class="card__body" :class="bodyClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" class="card__footer">
      <slot name="footer" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CardEmits, CardProps } from './Card.types';

defineOptions({ name: 'NCard' });

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
  clickable: false,
  disabled: false,
  tag: 'div',
});

const emit = defineEmits<CardEmits>();

const isInteractive = computed(() => props.clickable && !props.disabled);

const onClick = (event: MouseEvent) => {
  if (!isInteractive.value) return;
  emit('click', event);
};

const onKeyActivate = (event: KeyboardEvent) => {
  if (!isInteractive.value) return;
  emit('click', event as unknown as MouseEvent);
};

const cardClasses = computed(() => ({
  card: true,
  [`card--${props.variant}`]: true,
  'card--clickable': props.clickable,
  'card--disabled': props.disabled,
}));

const bodyClasses = computed(() => ({
  'card__body--padding-none': props.padding === 'none',
  'card__body--padding-sm': props.padding === 'sm',
  'card__body--padding-md': props.padding === 'md',
  'card__body--padding-lg': props.padding === 'lg',
}));
</script>

<style scoped>
.card {
  display: block;
  border-radius: var(--radius-xl);
  font-family: var(--font-family-base);
  color: var(--color-black);

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.card--default {
  background-color: var(--color-white);
  border: 1px solid transparent;
}

.card--outlined {
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-20);
}

.card--elevated {
  background-color: var(--color-white);
  border: 1px solid transparent;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card--clickable {
  cursor: pointer;
  outline: none;
}

.card--clickable:hover:not(.card--disabled) {
  border-color: var(--color-grey-30);
  transform: translateY(-1px);
}

.card--elevated.card--clickable:hover:not(.card--disabled) {
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.1);
}

.card--clickable:focus-visible:not(.card--disabled) {
  box-shadow: 0 0 0 3px rgba(0, 128, 0, 0.18);
}

.card--disabled {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
}

.card__header,
.card__footer {
  padding: var(--space-4);
}

.card__header {
  border-bottom: 1px solid var(--color-grey-20);
}

.card__footer {
  border-top: 1px solid var(--color-grey-20);
}

.card__body {
  display: block;
}

.card__body--padding-none {
  padding: 0;
}

.card__body--padding-sm {
  padding: var(--space-3);
}

.card__body--padding-md {
  padding: var(--space-4);
}

.card__body--padding-lg {
  padding: var(--space-6);
}
</style>