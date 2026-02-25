<template>
  <Teleport to="body">
    <Transition name="confirm-dialog">
      <div
        v-if="open"
        class="confirm-dialog"
        @click.self="handleOverlay"
      >
        <div
          ref="dialogRef"
          class="confirm-dialog__panel"
          role="alertdialog"
          aria-modal="true"
          :aria-labelledby="title ? 'cd-title' : undefined"
          :aria-describedby="description ? 'cd-desc' : undefined"
        >
          <Transition name="fade">
            <div v-if="loading" class="confirm-dialog__loading">
              <span class="confirm-dialog__spinner" />
            </div>
          </Transition>

          <div
            v-if="!$slots.default"
            class="confirm-dialog__icon"
            :class="`confirm-dialog__icon--${variant}`"
          >
            <NIcon :name="variant === 'danger' ? 'close' : 'check'" size="lg" />
          </div>

          <h3
            v-if="title"
            id="cd-title"
            class="confirm-dialog__title"
          >
            {{ title }}
          </h3>

          <p
            v-if="description && !$slots.default"
            id="cd-desc"
            class="confirm-dialog__description"
          >
            {{ description }}
          </p>

          <div v-if="$slots.default" class="confirm-dialog__content">
            <slot />
          </div>

          <div class="confirm-dialog__actions">
            <slot name="actions" :confirm="handleConfirm" :cancel="handleCancel">
              <button
                class="confirm-dialog__btn confirm-dialog__btn--cancel"
                :disabled="loading"
                @click="handleCancel"
              >
                {{ cancelText }}
              </button>
              <button
                class="confirm-dialog__btn"
                :class="confirmBtnClass"
                :disabled="disabled || loading"
                @click="handleConfirm"
              >
                <span v-if="loading" class="confirm-dialog__btn-spinner" />
                <template v-else>{{ confirmText }}</template>
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import NIcon from '@/components/Icon/Icon.vue';
import type { ConfirmDialogProps, ConfirmDialogEmits } from './ConfirmDialog.types';

defineOptions({ name: 'NConfirmDialog' });

const props = withDefaults(defineProps<ConfirmDialogProps>(), {
  title: '',
  description: '',
  confirmText: 'Подтвердить',
  cancelText: 'Отмена',
  variant: 'default',
  loading: false,
  disabled: false,
  closeOnOverlay: true,
  closeOnEsc: true,
});

const emit = defineEmits<ConfirmDialogEmits>();

const dialogRef = ref<HTMLElement | null>(null);

const confirmBtnClass = computed(() => ({
  'confirm-dialog__btn--confirm': props.variant === 'default',
  'confirm-dialog__btn--danger': props.variant === 'danger',
}));

const closeDialog = () => {
  if (props.loading) return;
  emit('update:open', false);
  emit('close');
};

const handleConfirm = () => {
  if (props.disabled || props.loading) return;
  emit('confirm');
};

const handleCancel = () => {
  if (props.loading) return;
  emit('cancel');
  closeDialog();
};

const handleOverlay = () => {
  if (props.closeOnOverlay) closeDialog();
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.open && props.closeOnEsc) {
    closeDialog();
  }
};

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      await nextTick();
      dialogRef.value?.focus?.();
    } else {
      document.body.style.overflow = '';
    }
  },
  { immediate: true },
);

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped lang="scss">
.confirm-dialog {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal, 1200);
  backdrop-filter: blur(2px);
  padding: 16px;

  &__panel {
    position: relative;
    width: 100%;
    max-width: 420px;
    background: var(--color-white, #fff);
    border-radius: 16px;
    padding: 32px 24px 24px;
    box-shadow: var(--shadow-xl);
    text-align: center;
    outline: none;
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-round, 50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;

    &--default {
      background: rgba(0, 150, 57, 0.1);
      color: var(--color-green-90, #009639);
    }

    &--danger {
      background: rgba(237, 110, 28, 0.1);
      color: var(--color-orange, #ed6e1c);
    }
  }

  &__title {
    font-family: var(--font-family-base, 'Montserrat', sans-serif);
    font-size: 18px;
    font-weight: 600;
    color: var(--color-grey-100, #000);
    margin: 0 0 8px;
  }

  &__description {
    font-family: var(--font-family-base, 'Montserrat', sans-serif);
    font-size: 14px;
    color: var(--color-grey-70, #464e56);
    margin: 0 0 24px;
    line-height: 1.5;
  }

  &__content {
    margin-bottom: 24px;
    text-align: left;
  }

  &__actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--size-height-md, 40px);
    min-width: 120px;
    padding: 0 var(--size-padding-horizontal-md, 20px);
    border-radius: var(--radius-xl, 60px);
    border: 1px solid transparent;
    font-family: var(--font-family-base, 'Montserrat', sans-serif);
    font-size: var(--font-size-sm, 14px);
    font-weight: var(--font-weight-medium, 500);
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }

    &--cancel {
      background: var(--color-white, #fff);
      border-color: var(--color-blue-30, #cfd7db);
      color: var(--color-grey-100, #000);

      &:hover:not(:disabled) {
        border-color: var(--color-grey-100, #000);
      }
    }

    &--confirm {
      background: var(--color-green-90, #009639);
      color: var(--color-white, #fff);

      &:hover:not(:disabled) {
        background: var(--color-green-80, #72ca94);
      }

      &:active:not(:disabled) {
        background: var(--color-green-100, #097f2d);
      }

      &:disabled {
        background: var(--color-grey-20, #d9d9d9);
        color: var(--color-grey-80, #999);
        opacity: 1;
      }
    }

    &--danger {
      background: var(--color-orange, #ed6e1c);
      color: var(--color-white, #fff);

      &:hover:not(:disabled) {
        background: #d4600f;
      }

      &:active:not(:disabled) {
        background: #b5520d;
      }

      &:disabled {
        background: var(--color-grey-20, #d9d9d9);
        color: var(--color-grey-80, #999);
        opacity: 1;
      }
    }
  }

  &__btn-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: var(--color-white, #fff);
    border-radius: 50%;
    animation: cd-spin 0.7s linear infinite;
    display: inline-block;
  }

  &__loading {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(2px);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  &__spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--color-grey-20, #d9d9d9);
    border-top-color: var(--color-green-90, #009639);
    border-radius: 50%;
    animation: cd-spin 0.8s linear infinite;
    display: inline-block;
  }
}

/* Entrance / exit animations */
.confirm-dialog-enter-active {
  animation: cd-overlay-in 0.3s ease;

  .confirm-dialog__panel {
    animation: cd-panel-in 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

.confirm-dialog-leave-active {
  animation: cd-overlay-out 0.2s ease forwards;

  .confirm-dialog__panel {
    animation: cd-panel-out 0.2s ease forwards;
  }
}

@keyframes cd-overlay-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes cd-overlay-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes cd-panel-in {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes cd-panel-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(8px);
  }
}

@keyframes cd-spin {
  to { transform: rotate(360deg); }
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
