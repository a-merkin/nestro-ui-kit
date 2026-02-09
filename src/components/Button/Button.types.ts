export type ButtonVariant = 'primary' | 'secondary' | 'text' | 'circle';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
  variant?: ButtonVariant;
  disabled?: boolean;
  type?: ButtonType;
  loading?: boolean;
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void;
}
