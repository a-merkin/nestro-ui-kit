export type ConfirmDialogVariant = 'default' | 'danger';

export interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmDialogVariant;
  loading?: boolean;
  disabled?: boolean;
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
}

export interface ConfirmDialogEmits {
  (e: 'confirm'): void;
  (e: 'cancel'): void;
  (e: 'close'): void;
  (e: 'update:open', value: boolean): void;
}
