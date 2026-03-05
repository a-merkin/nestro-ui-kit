export interface DropdownOption {
  [key: string]: any;
}

export interface DropdownProps {
  modelValue: string | number | null;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  searchable?: boolean;
  clearable?: boolean;
  valueKey?: string;
  labelKey?: string;
  loading?: boolean;
  label?: string;
  showOptionTooltip?: boolean;
}

export interface DropdownEmits {
  (e: 'update:modelValue', value: string | number | null): void;
  (e: 'change', value: string | number | null): void;
  (e: 'clear'): void;
}
