export interface WorkPlaceTab {
  label: string;
  value: string;
}

export interface WorkPlaceProps {
  modelValue: string;
  tabs: WorkPlaceTab[];
}
