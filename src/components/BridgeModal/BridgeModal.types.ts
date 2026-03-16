export interface BridgeModalProps {
  channelName?: string;
  autoCloseOnEvent?: string;
  debug?: boolean;
}

export type BridgeMessage = {
  type: string;
  payload?: any;
};

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

export interface BridgeModalHandle {
  close: () => void;
  postEvent: (type: string, payload?: any) => void;
}
