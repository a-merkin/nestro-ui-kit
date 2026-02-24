<template>
  <Teleport to="body">
    <Transition name="notification-fade">
      <div
        v-if="visible"
        class="notification"
        :class="notificationClasses"
        role="status"
        aria-live="polite"
        @mouseenter="pauseAutoClose"
        @mouseleave="resumeAutoClose"
        @click="handleClick"
      >
        <div class="notification__icon" aria-hidden="true">
          <slot name="icon" />
        </div>

        <div class="notification__content">
          <div v-if="titleComputed || $slots.title" class="notification__title">
            <slot name="title">{{ titleComputed }}</slot>
          </div>

          <div v-if="messageComputed || $slots.default" class="notification__message">
            <slot>{{ messageComputed }}</slot>
          </div>
        </div>

        <button
          v-if="closable"
          type="button"
          class="notification__close"
          :disabled="disabled"
          aria-label="Close notification"
          @click.stop="onCloseClick"
        >
          ✕
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue';
import type { NotificationEmits, NotificationProps } from './Notification.types';

defineOptions({ name: 'NNotification' });

const props = withDefaults(defineProps<NotificationProps>(), {
  visible: false,
  type: 'info',
  position: 'top-right',

  title: '',
  message: '',

  closable: true,
  disabled: false,

  duration: 3000,
  pauseOnHover: true,
});

const emit = defineEmits<NotificationEmits>();

let timer: number | null = null;
let remaining = props.duration;
let startedAt = 0;

const titleComputed = computed(() => props.title || undefined);
const messageComputed = computed(() => props.message || undefined);

const notificationClasses = computed(() => ({
  [`notification--${props.type}`]: true,
  [`notification--${props.position}`]: true,
  'notification--disabled': props.disabled,
}));

const visible = computed(() => props.visible);

watch(
  () => props.visible,
  (v) => {
    if (v) startAutoClose();
    else stopTimer();
  },
  { immediate: true }
);

watch(
  () => props.duration,
  () => {
    remaining = props.duration;
    if (props.visible) startAutoClose(true);
  }
);

function startAutoClose(reset = false) {
  stopTimer();
  if (!props.duration || props.duration <= 0) return;

  if (reset) remaining = props.duration;

  startedAt = Date.now();
  timer = window.setTimeout(() => close('timeout'), remaining);
}

function stopTimer() {
  if (timer != null) {
    window.clearTimeout(timer);
    timer = null;
  }
}

function pauseAutoClose() {
  if (!props.pauseOnHover) return;
  if (!props.visible) return;
  if (timer == null) return;

  const elapsed = Date.now() - startedAt;
  remaining = Math.max(0, remaining - elapsed);
  stopTimer();
  emit('pause');
}

function resumeAutoClose() {
  if (!props.pauseOnHover) return;
  if (!props.visible) return;
  if (timer != null) return;
  if (remaining <= 0) return;

  startedAt = Date.now();
  timer = window.setTimeout(() => close('timeout'), remaining);
  emit('resume');
}

function close(reason: 'close' | 'timeout' | 'programmatic' = 'close') {
  if (props.disabled) return;
  stopTimer();
  remaining = props.duration;

  emit('update:visible', false);
  emit('close', { reason });
}

function handleClick(event: MouseEvent) {
  if (props.disabled) return;
  emit('click', event);
}

function onCloseClick() {
  close('close');
}

onBeforeUnmount(() => stopTimer());
</script>

<style lang="scss" scoped>
.notification-fade-enter-active,
.notification-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.notification-fade-enter-from,
.notification-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.notification {
  position: fixed;
  z-index: var(--z-max);

  display: flex;
  align-items: flex-start;
  gap: var(--space-3);

  min-width: 280px;
  max-width: 420px;

  padding: var(--space-4);
  border-radius: var(--radius-xl);
  border: var(--border-width-sm) solid transparent;

  font-family: var(--font-family-base);
  background: var(--color-white);
  color: var(--color-black);

  box-shadow: var(--shadow-lg);
}

.notification--top-right {
  top: var(--space-6);
  right: var(--space-6);
}
.notification--top-left {
  top: var(--space-6);
  left: var(--space-6);
}
.notification--bottom-right {
  bottom: var(--space-6);
  right: var(--space-6);
}
.notification--bottom-left {
  bottom: var(--space-6);
  left: var(--space-6);
}

.notification__icon {
  width: var(--size-icon-lg);
  height: var(--size-icon-lg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  font-size: 18px;
  margin-top: 2px;
}

.notification__content {
  flex: 1 1 auto;
  min-width: 0;
}

.notification__title {
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
  margin-bottom: var(--space-1);
}

.notification__message {
  font-size: var(--font-size-sm);
  line-height: var(--line-height-md);
  color: var(--color-grey-90);
  word-break: break-word;
}

.notification__close {
  flex: 0 0 auto;
  width: var(--size-height-md);
  height: var(--size-height-md);

  border-radius: var(--radius-round);
  border: var(--border-width-sm) solid var(--color-grey-20);
  background: var(--color-white);
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.notification__close:hover:not(:disabled) {
  border-color: var(--color-grey-30);
  background-color: var(--color-grey-10);
}

.notification--disabled {
  opacity: 0.7;
  pointer-events: none;
}

.notification--info {
  border-color: var(--color-blue-30);
}
.notification--success {
  border-color: var(--color-green-60);
}
.notification--warn {
  border-color: var(--color-yellow-60);
}
.notification--error {
  border-color: var(--color-red-60);
}
</style>