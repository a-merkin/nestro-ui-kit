export type SegmentedControlValue = string | number;

export interface SegmentedControlOption<T = SegmentedControlValue> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface SegmentedControlProps<T = SegmentedControlValue> {
  options: SegmentedControlOption<T>[];
  modelValue: T;
  disabled?: boolean;
}
