import type { BridgeModalOptions, BridgeModalHandle, BridgeMessage } from './BridgeModal.types';

export function openBridgeModal(options: BridgeModalOptions): BridgeModalHandle | undefined {
  const {
    url,
    data = {},
    mode = 'tab',
    channelName = 'nestro-bridge-channel',
    onEvent,
    onSave,
    onClose,
    debug = false,
  } = options;

  const channel = new BroadcastChannel(channelName);

  channel.onmessage = (ev: MessageEvent<BridgeMessage>) => {
    const msg = ev.data;
    if (debug) console.debug('[BridgeService] received', msg);

    switch (msg.type) {
      case 'event':
        onEvent?.(msg.payload);
        break;
      case 'save':
        onSave?.(msg.payload);
        break;
      case 'close':
        onClose?.(msg.payload);
        cleanup();
        break;
      default:
        onEvent?.(msg);
    }
  };

  const features = 'width=900,height=800,noopener,noreferrer';
  const win = mode === 'popup' ? window.open(url, '_blank', features) : window.open(url, '_blank');

  if (!win) {
    console.error('[BridgeService] Failed to open window');
    channel.close();
    return undefined;
  }

  const initMessage: BridgeMessage = { type: 'init', payload: data };
  if (debug) console.debug('[BridgeService] send init', initMessage);
  // Delay to allow the new tab to mount and open its BroadcastChannel
  setTimeout(() => channel.postMessage(initMessage), 200);

  const interval = setInterval(() => {
    if (win.closed) {
      cleanup();
      onClose?.({ reason: 'window_closed' });
    }
  }, 500);

  function cleanup() {
    clearInterval(interval);
    try {
      channel.close();
    } catch (_) {
      // ignore
    }
  }

  return {
    close() {
      channel.postMessage({ type: 'close', payload: { reason: 'manual' } });
      cleanup();
      win.close();
    },
    postEvent(type: string, payload?: any) {
      const msg: BridgeMessage = { type, payload };
      if (debug) console.debug('[BridgeService] postEvent', msg);
      channel.postMessage(msg);
    },
  };
}
