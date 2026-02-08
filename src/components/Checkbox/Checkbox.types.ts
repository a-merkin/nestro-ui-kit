export interface CheckboxProps {
  modelValue: boolean | any[];
  value?: any;
  disabled?: boolean;
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean | any[]): void;
}
