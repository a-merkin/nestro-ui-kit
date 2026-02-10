export type MultiSelectValue = string | number;

export interface MultiSelectOption {
  value: MultiSelectValue;
  label: string;
}

export interface MultiSelectProps {
  modelValue: MultiSelectValue[];
  options: MultiSelectOption[];
  searchable?: boolean;
}
