<template>
  <div class="bridge-modal" role="dialog" aria-modal="true">
    <header v-if="$slots.header" class="bridge-modal__header">
      <slot name="header" />
    </header>

    <main class="bridge-modal__content" role="main">
      <slot :init-data="initData" :post-event="postEvent" :close="handleClose" />
    </main>

    <footer v-if="$slots.footer" class="bridge-modal__footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import type { BridgeModalProps, BridgeMessage } from './BridgeModal.types';

defineOptions({ name: 'NBridgeModal' });

const props = withDefaults(defineProps<BridgeModalProps>(), {
  channelName: 'nestro-bridge-channel',
  autoCloseOnEvent: '',
  debug: false,
});

const initData = ref<any>(null);
let channel: BroadcastChannel | null = null;

onMounted(() => {
  try {
    channel = new BroadcastChannel(props.channelName);

    channel.onmessage = (ev: MessageEvent<BridgeMessage>) => {
      const msg = ev.data;
      if (props.debug) console.debug('[BridgeModal] received:', msg);

      switch (msg.type) {
        case 'init':
          initData.value = msg.payload;
          break;
        case 'event':
          handleIncomingEvent(msg.payload);
          break;
        case 'close':
          safeClose();
          break;
        default:
          handleIncomingEvent(msg);
      }
    };
  } catch (err) {
    console.error('[BridgeModal] BroadcastChannel init failed', err);
  }
});

onBeforeUnmount(() => {
  channel?.close();
  channel = null;
});

function postEvent(type: string, payload?: any) {
  if (!channel) {
    console.warn('[BridgeModal] channel not initialized');
    return;
  }
  const msg: BridgeMessage = { type, payload };
  channel.postMessage(msg);
  if (props.debug) console.debug('[BridgeModal] sent:', msg);
}

function handleIncomingEvent(payload: any) {
  if (props.debug) console.debug('[BridgeModal] incoming event:', payload);
  if (props.autoCloseOnEvent && payload?.type === props.autoCloseOnEvent) {
    safeClose();
  }
}

function handleClose() {
  postEvent('close', { reason: 'user' });
  safeClose();
}

function safeClose() {
  try {
    channel?.close();
  } catch (_) {
    // ignore
  }
  try {
    window.close();
  } catch (_) {
    // ignore
  }
}

defineExpose({
  initData,
  postEvent,
  handleClose,
});
</script>

<style scoped lang="scss">
.bridge-modal {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  padding: var(--space-6);
  background-color: var(--color-white);
  color: var(--color-grey-70);
  animation: bridge-modal-fade-in var(--duration-normal) var(--easing-decelerate);

  @media (max-width: 768px) {
    padding: var(--space-4);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    border-bottom: var(--border-width-sm) solid var(--color-grey-20);
    padding-bottom: var(--space-4);
    flex-shrink: 0;

    h1,
    h2,
    h3 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-4) 0;
    scroll-behavior: smooth;
  }

  &__footer {
    border-top: var(--border-width-sm) solid var(--color-grey-20);
    padding-top: var(--space-4);
    display: flex;
    justify-content: flex-end;
    gap: var(--space-3);
    flex-shrink: 0;

    button {
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-sm);
      border: var(--border-width-sm) solid var(--color-grey-40);
      background-color: var(--color-grey-50);
      cursor: pointer;
      transition: background-color var(--motion-standard);

      &:hover {
        background-color: var(--color-blue-60);
      }

      &:active {
        background-color: var(--color-blue-40);
      }
    }
  }
}

@keyframes bridge-modal-fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
