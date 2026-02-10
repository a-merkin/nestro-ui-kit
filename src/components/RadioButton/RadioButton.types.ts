export type RadioValue = string | number;

export interface RadioButtonProps {
  modelValue?: RadioValue;
  value: RadioValue;
  name?: string;
  disabled?: boolean;
  label?: string;
}
