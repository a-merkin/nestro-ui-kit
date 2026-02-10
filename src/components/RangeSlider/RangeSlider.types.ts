export interface RangeSliderProps {
  modelValue?: number | [number, number];
  values?: number[];
  disabled?: boolean;
  minLabel?: string;
  maxLabel?: string;
  cutoffs?: number[];
}

export type RangeSliderEmit = {
  (e: 'update:modelValue', value: number | [number, number]): void;
};
