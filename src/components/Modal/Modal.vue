<template>
  <Teleport v-if="teleport" to="body">
    <Transition name="modal-zoom">
      <div
        v-if="modelValue"
        ref="overlayRef"
        class="modal"
        tabindex="-1"
        @click.self="handleBackdrop"
      >
        <div
          ref="dialogRef"
          class="modal__dialog"
          role="dialog"
          aria-modal="true"
          :style="dialogStyle"
        >
          <header v-if="$slots.title" class="modal__header">
            <h3 class="modal__title">
              <slot name="title" />
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
              <slot name="loading">
                <Loader size="lg" variant="primary" text="Загрузка..." />
              </slot>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue';
import Loader from '@/components/Loader/Loader.vue';
import type { ModalProps } from './Modal.types';

const props = withDefaults(defineProps<ModalProps>(), {
  loading: false,
  teleport: true,
  closeOnBackdrop: true,
  closeOnEsc: true,
  width: 600,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'open'): void;
  (e: 'close'): void;
}>();

const overlayRef = ref<HTMLElement | null>(null);
const dialogRef = ref<HTMLElement | null>(null);

const dialogStyle = computed(() => ({
  maxWidth: typeof props.width === 'number' ? `${props.width}px` : props.width,
}));

const close = () => {
  if (props.loading) return;
  emit('update:modelValue', false);
  emit('close');
};

const handleBackdrop = () => {
  if (props.closeOnBackdrop) close();
};

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnEsc) close();
};

/* body scroll lock + focus management */
watch(
  () => props.modelValue,
  async (open) => {
    if (open) {
      emit('open');
      document.body.style.overflow = 'hidden';
      await nextTick();
      dialogRef.value?.focus?.();
    } else {
      document.body.style.overflow = '';
    }
  },
  { immediate: true }
);

onMounted(() => {
  document.addEventListener('keydown', handleEsc);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEsc);
  document.body.style.overflow = '';
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
  z-index: 1000;
  backdrop-filter: blur(2px);
  padding: 16px;
  overflow-y: auto;

  &__dialog {
    position: relative;
    width: 100%;
    background: var(--modal-bg, #fff);
    border-radius: 16px;
    padding: 24px;
    box-shadow: var(--shadow-xl);
    outline: none;
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
    color: var(--modal-title, #222);
    margin: 0;
  }

  &__content {
    font-size: 16px;
    color: var(--modal-text, #444);
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

/* zoom animation */
.modal-zoom-enter-active {
  animation: modalZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-zoom-leave-active {
  animation: modalZoomOut 0.25s ease forwards;
}

@keyframes modalZoomIn {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modalZoomOut {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
