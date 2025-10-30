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

const props = defineProps({
  channelName: { type: String, default: 'nestro-bridge-channel' },
  autoCloseOnEvent: { type: String, default: '' },
  debug: { type: Boolean, default: false },
});

type BridgeMessage = {
  type: string;
  payload?: any;
};

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
  } catch {}
  try {
    window.close();
  } catch {}
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
  padding: 1.5rem;
  background-color: #fff;
  color: #222;
  font-family:
    Inter,
    system-ui,
    -apple-system,
    sans-serif;

  animation: bridge-modal-fade-in 0.2s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 1rem;
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
    padding: 1rem 0;
    scroll-behavior: smooth;
  }

  &__footer {
    border-top: 1px solid #e5e5e5;
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    flex-shrink: 0;

    button {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      background-color: #f9f9f9;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #efefef;
      }

      &:active {
        background-color: #e0e0e0;
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
