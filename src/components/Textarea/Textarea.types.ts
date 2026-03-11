export type TextareaVariant = 'default' | 'outlined' | 'filled';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export type TextareaProps = {
  modelValue?: string;

  variant?: TextareaVariant;

  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;

  error?: boolean;
  errorMessage?: string;

  rows?: number;
  cols?: number;
  maxlength?: number;

  placeholder?: string;

  label?: string;
  hint?: string;

  autofocus?: boolean;
  resize?: TextareaResize;
  showCount?: boolean;

  id?: string;
  name?: string;
};

export type TextareaEmits = {
  (e: 'update:modelValue', value: string): void;
  (e: 'input', event: Event): void;
  (e: 'change', event: Event): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
};
