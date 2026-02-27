export type FilterType = 'dropdown' | 'multiselect' | 'number' | 'date' | 'boolean' | 'text';

export type FilterRangeValue = {
  from?: string | number | null;
  to?: string | number | null;
};

export type FilterValue = string | string[] | number | FilterRangeValue | boolean | null;

export interface FilterConfigOption {
  label: string;
  value: string | number;
}

export interface FilterGroupItem {
  id: string;
  key: string;
  label: string;
  type: FilterType;
  order: number;
  config?: {
    options?: FilterConfigOption[];
    min?: number;
    max?: number;
    step?: number;
    format?: string;
    [key: string]: unknown;
  };
}

export interface FilterGroup {
  id: string;
  name: string;
  moduleId: string;
  isSystem: boolean;
  isDefault: boolean;
  items: FilterGroupItem[];
  values: Record<string, FilterValue>;
}

export interface FilterGroupSavePayload {
  id: string;
  name: string;
  items: FilterGroupItem[];
  values: Record<string, FilterValue>;
}

export interface SearchFilterPanelProps {
  searchQuery: string;
  groups: FilterGroup[];
  activeGroupId?: string | null;
  availableFilters?: FilterGroupItem[];
  placeholder?: string;
  loading?: boolean;
}

export interface SearchFilterPanelEmits {
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:activeGroupId', id: string | null): void;
  (e: 'search', query: string): void;
  (e: 'groupSelect', group: FilterGroup): void;
  (e: 'groupSetDefault', group: FilterGroup): void;
  (e: 'groupSave', payload: FilterGroupSavePayload): void;
  (e: 'groupDelete', groupId: string): void;
  (e: 'groupCreate'): void;
}
