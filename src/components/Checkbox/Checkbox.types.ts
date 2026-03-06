export interface CheckboxProps {
  modelValue: boolean | any[];
  value?: any;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean | any[]): void;
}
