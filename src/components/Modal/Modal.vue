<template>
  <component :is="teleport ? 'teleport' : 'div'" :to="teleport ? 'body' : undefined">
    <Transition name="modal-zoom">
      <div v-if="modelValue" class="modal" tabindex="0" @click.self="close" @keydown.esc="close">
        <div class="modal__dialog" role="dialog" aria-modal="true">
          <header v-if="$slots.title" class="modal__header">
            <h3 class="modal__title">
              <slot name="title"></slot>
            </h3>
          </header>

          <div class="modal__content">
            <slot />
          </div>

          <footer v-if="$slots.actions" class="modal__footer">
            <slot name="actions" />
          </footer>

          <Transition name="fade">
            <div v-if="loading" class="modal__loading">
              <Loader size="large" variant="primary" text="Загрузка..." />
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </component>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import Loader from '@/components/Loader/Loader.vue';

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    loading?: boolean;
    teleport?: boolean;
  }>(),
  {
    loading: false,
    teleport: true,
  }
);

const emit = defineEmits(['update:modelValue']);

function close() {
  if (!props.loading) {
    emit('update:modelValue', false);
  }
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && !props.loading) close();
}

onMounted(() => {
  document.addEventListener('keydown', handleKey);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKey);
});
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  backdrop-filter: blur(2px);
  padding: 16px;
  overflow-y: auto;

  &__dialog {
    position: relative;
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
    transform-origin: center;
    overflow: hidden;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: #222;
  }

  &__content {
    font-size: 16px;
    color: #444;
  }

  &__footer {
    margin-top: 24px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
  }

  &__loading {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
}

/* Анимация модалки */
.modal-zoom-enter-active {
  animation: modalZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-zoom-leave-active {
  animation: modalZoomOut 0.25s ease forwards;
}

@keyframes modalZoomIn {
  0% {
    opacity: 0;
    transform: scale(0.94) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modalZoomOut {
  0% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
}

/* Анимация загрузки */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
