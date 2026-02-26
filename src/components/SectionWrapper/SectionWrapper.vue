<template>
  <section class="section-wrapper">
    <header class="section-wrapper__header">
      <slot name="header">
        <h2 class="section-wrapper__title">{{ title }}</h2>
      </slot>

      <div class="section-wrapper__line" />

      <slot name="actions">
        <button
          class="section-wrapper__toggle"
          type="button"
          :aria-expanded="isOpen"
          @click="toggle"
        >
          <svg
            class="section-wrapper__icon"
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 5L11 1" stroke="currentColor" stroke-width="2" />
            <path d="M1 7.66667L6 11L11 7.66667" stroke="currentColor" stroke-width="2" />
          </svg>
        </button>
      </slot>
    </header>

    <Transition name="section-wrapper-slide">
      <div v-show="isOpen" class="section-wrapper__content">
        <slot />
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SectionWrapperProps } from './SectionWrapper.types';

defineOptions({ name: 'NSectionWrapper' });

const props = withDefaults(defineProps<SectionWrapperProps>(), {
  defaultOpen: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed({
  get() {
    return props.modelValue ?? props.defaultOpen;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
.section-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);

  &__header {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  &__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-medium);
    margin: 0;
  }

  &__line {
    flex: 1;
    height: var(--border-width-md);
    background-color: var(--color-blue-30);
  }

  &__toggle {
    background-color: var(--color-blue-50);
    border: none;
    border-radius: var(--radius-round);
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform var(--duration-medium) var(--easing-standard);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__icon {
    transition: transform var(--duration-medium) var(--easing-standard);
  }

  &__toggle[aria-expanded='true'] &__icon {
    transform: rotate(180deg);
  }

  &__content {
    overflow: hidden;
  }
}

.section-wrapper-slide-enter-active,
.section-wrapper-slide-leave-active {
  transition: all var(--duration-medium) var(--easing-standard);
}

.section-wrapper-slide-enter-from,
.section-wrapper-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.section-wrapper-slide-enter-to,
.section-wrapper-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}
</style>
