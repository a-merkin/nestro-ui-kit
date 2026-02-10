export type RadioGroupValue = string | number;

export interface RadioGroupOption {
  label: string;
  value: RadioGroupValue;
  disabled?: boolean;
}

export interface RadioGroupProps {
  modelValue?: RadioGroupValue;
  options: RadioGroupOption[];
  name?: string;
  label?: string;
  disabled?: boolean;
  direction?: 'vertical' | 'horizontal';
}
