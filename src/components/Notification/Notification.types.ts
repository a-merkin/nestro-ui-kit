export type NotificationType = 'info' | 'success' | 'warn' | 'error';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export type NotificationCloseReason = 'close' | 'timeout' | 'programmatic';

export type NotificationCloseEvent = {
  reason: NotificationCloseReason;
};

export type NotificationProps = {
  visible?: boolean;

  type?: NotificationType;
  position?: NotificationPosition;

  title?: string;
  message?: string;

  closable?: boolean;
  disabled?: boolean;

  duration?: number;
  pauseOnHover?: boolean;
};

export type NotificationEmits = {
  (e: 'update:visible', value: boolean): void;
  (e: 'close', payload: NotificationCloseEvent): void;
  (e: 'click', event: MouseEvent): void;
  (e: 'pause'): void;
  (e: 'resume'): void;
};