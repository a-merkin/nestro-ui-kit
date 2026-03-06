export type ButtonLayout = 'stacked' | 'horizontal';

export interface InputNumberProps {
  modelValue: number | null;
  min?: number;
  max?: number;
  step?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  showButtons?: boolean;
  buttonLayout?: ButtonLayout;
  useGrouping?: boolean;
}

export interface InputNumberEmits {
  (e: 'update:modelValue', value: number | null): void;
  (e: 'change', value: number | null): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}
