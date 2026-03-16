import type { DropdownOption } from '../Dropdown/Dropdown.types';

export interface FilterDropdown {
  key: string;
  label: string;
  options: DropdownOption[];
}

export type FilterValue = string | number | null;

export type FilterValues = Record<string, FilterValue>;

export interface SidebarFiltersProps {
  filters: FilterDropdown[];
  modelValue: FilterValues;
  disabledFields?: string[];
  showAllOption?: string[];
  searchable?: boolean;
  showActions?: boolean;
  applyLabel?: string;
  clearLabel?: string;
  applyDisabled?: boolean;
  allOptionLabels?: Record<string, string>;
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface SidebarFiltersEmits {
  (e: 'update:modelValue', value: FilterValues): void;
  (e: 'apply'): void;
  (e: 'clear'): void;
  (e: 'filterChange', key: string, value: FilterValue): void;
  (e: 'update:collapsed', value: boolean): void;
}
