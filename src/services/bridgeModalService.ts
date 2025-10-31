export interface BridgeModalOptions {
  url: string;

  data?: Record<string, any>;

  channelName?: string;

  mode?: 'tab' | 'popup';

  onEvent?: (event: { type: string; payload?: any }) => void;
  onSave?: (payload: any) => void;
  onClose?: (payload?: any) => void;

  debug?: boolean;
}

export function openBridgeModal(options: BridgeModalOptions) {
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

  channel.onmessage = (ev) => {
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
    return;
  }

  const initMessage = { type: 'init', payload: data };
  if (debug) console.debug('[BridgeService] send init', initMessage);
  setTimeout(() => channel.postMessage(initMessage), 200);

  const interval = setInterval(() => {
    if (win.closed) {
      cleanup();
      onClose?.({ reason: 'window_closed' });
    }
  }, 500);

  function cleanup() {
    try {
      clearInterval(interval);
      channel.close();
    } catch (err) {
      console.warn('[BridgeService] cleanup error', err);
    }
  }

  return {
    close: () => {
      channel.postMessage({ type: 'close', payload: { reason: 'manual' } });
      cleanup();
      win.close();
    },
    postEvent: (type: string, payload?: any) => {
      const msg = { type, payload };
      if (debug) console.debug('[BridgeService] postEvent', msg);
      channel.postMessage(msg);
    },
  };
}
