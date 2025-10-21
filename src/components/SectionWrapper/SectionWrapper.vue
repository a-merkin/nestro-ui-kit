<template>
  <div class="accordion">
    <div class="accordion__header">
      <h2 class="accordion__title text-h1">{{ title }}</h2>
      <div class="accordion__line"></div>

      <button class="accordion__button" type="button" :aria-expanded="isOpen" @click="toggle">
        <svg
          class="accordion__icon"
          width="12"
          height="13"
          viewBox="0 0 12 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L6 5L11 1" stroke="white" stroke-width="2" />
          <path d="M1 7.66667L6 11L11 7.66667" stroke="white" stroke-width="2" />
        </svg>
      </button>
    </div>

    <Transition name="accordion-slide">
      <div v-if="isOpen" class="accordion__content">
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  title: string;
}

const props = defineProps<Props>();

const isOpen = ref(true);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
$accordion-bg: #b6c7cf;
$accordion-line: #cfd7db;
$accordion-transition: 0.3s ease;

.accordion {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  &__title {
    font-size: 22px;
    font-weight: 500;
    margin: 0;
  }

  &__line {
    flex: 1;
    height: 2px;
    background-color: $accordion-line;
  }

  &__button {
    background-color: $accordion-bg;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    transition: transform $accordion-transition;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    .accordion__icon {
      transition: transform $accordion-transition;
    }

    &[aria-expanded='true'] .accordion__icon {
      transform: rotate(180deg);
    }
  }

  &__content {
    overflow: hidden;
  }

  .accordion-slide-enter-active,
  .accordion-slide-leave-active {
    transition: all $accordion-transition;
  }

  .accordion-slide-enter-from,
  .accordion-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
    max-height: 0;
  }

  .accordion-slide-enter-to,
  .accordion-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
    max-height: 500px;
  }
}
</style>
