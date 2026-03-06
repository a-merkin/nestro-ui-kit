export type DatePickerMode = 'single' | 'range';

export interface DatePickerProps {
  modelValue: string | null;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  minDate?: string;
  maxDate?: string;
  clearable?: boolean;
  displayFormat?: 'DD.MM.YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY';
}

export interface DatePickerEmits {
  (e: 'update:modelValue', value: string | null): void;
  (e: 'change', value: string | null): void;
  (e: 'clear'): void;
}
