<!-- Loader.vue -->
<template>
  <div :class="loaderClasses" :style="loaderStyle">
    <div class="loader__spinner"></div>
    <span v-if="text" class="loader__text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type LoaderSize = 'small' | 'medium' | 'large';
type LoaderVariant = 'primary' | 'secondary' | 'white';

interface Props {
  size?: LoaderSize;
  variant?: LoaderVariant;
  text?: string;
  overlay?: boolean;
}

const { size, variant, text, overlay } = withDefaults(defineProps<Props>(), {
  size: 'medium',
  variant: 'primary',
  text: '',
  overlay: false,
});

const loaderClasses = computed(() => ({
  loader: true,
  [`loader--${size}`]: true,
  [`loader--${variant}`]: true,
  'loader--overlay': overlay,
}));

const loaderStyle = computed(() => {
  if (!overlay) return {};

  return {
    position: 'fixed' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  };
});
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
  display: flex;
}

.loader__spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-sizing: border-box;
}

/* Размеры */
.loader--small {
  .loader__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
  }
}

.loader--medium {
  .loader__spinner {
    width: 24px;
    height: 24px;
    border: 3px solid transparent;
  }
}

.loader--large {
  .loader__spinner {
    width: 32px;
    height: 32px;
    border: 4px solid transparent;
  }
}

/* Варианты цветов */
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
