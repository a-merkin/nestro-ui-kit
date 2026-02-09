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
  gap: 12px;
}

.loader--overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
}

.loader__spinner {
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  box-sizing: border-box;
}

.loader--sm .loader__spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
}

.loader--md .loader__spinner {
  width: 24px;
  height: 24px;
  border: 3px solid transparent;
}

.loader--lg .loader__spinner {
  width: 32px;
  height: 32px;
  border: 4px solid transparent;
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
  font-size: 14px;
  font-weight: 400;
  text-align: center;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
