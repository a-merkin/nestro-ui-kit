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
$bg: #b6c7cf;
$line: #cfd7db;
$transition: 0.3s ease;

.section-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__title {
    font-size: 22px;
    font-weight: 500;
    margin: 0;
  }

  &__line {
    flex: 1;
    height: 2px;
    background-color: $line;
  }

  &__toggle {
    background-color: $bg;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transition: transform $transition;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__icon {
    transition: transform $transition;
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
  transition: all $transition;
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
