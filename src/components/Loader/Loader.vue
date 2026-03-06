<template>
  <div :class="classes" role="status" aria-live="polite">
    <div class="loader__spinner" />
    <span v-if="text" class="loader__text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { LoaderProps } from './Loader.types';

defineOptions({ name: 'NLoader' });

const props = withDefaults(defineProps<LoaderProps>(), {
  size: 'md',
  variant: 'primary',
  text: '',
  overlay: false,
});

const classes = computed(() => [
  'loader',
  `loader--${props.size}`,
  `loader--${props.variant}`,
  { 'loader--overlay': props.overlay },
]);
</script>

<style scoped lang="scss">
.loader {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
}

.loader--overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-max);
  background: var(--color-bg-backdrop);
}

.loader__spinner {
  border-radius: var(--radius-round);
  animation: spin 0.9s linear infinite;
  box-sizing: border-box;
}

.loader--sm .loader__spinner {
  width: var(--size-icon-sm);
  height: var(--size-icon-sm);
  border: var(--border-width-md) solid transparent;
}

.loader--md .loader__spinner {
  width: var(--size-icon-lg);
  height: var(--size-icon-lg);
  border: var(--border-width-lg) solid transparent;
}

.loader--lg .loader__spinner {
  width: var(--size-height-sm);
  height: var(--size-height-sm);
  border: var(--border-width-xl) solid transparent;
}

.loader--primary {
  .loader__spinner {
    border-bottom-color: var(--color-green-100);
  }
  .loader__text {
    color: var(--color-grey-100);
  }
}

.loader--secondary {
  .loader__spinner {
    border-bottom-color: var(--color-grey-80);
  }
  .loader__text {
    color: var(--color-grey-80);
  }
}

.loader--white {
  .loader__spinner {
    border-bottom-color: var(--color-white);
  }
  .loader__text {
    color: var(--color-white);
  }
}

.loader__text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-regular);
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
