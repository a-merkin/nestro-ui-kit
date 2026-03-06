export type MultiSelectValue = string | number;

export interface MultiSelectOption {
  value: MultiSelectValue;
  label: string;
}

export interface MultiSelectProps {
  modelValue: MultiSelectValue[];
  options: MultiSelectOption[];
  searchable?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
  noResultsText?: string;
}
