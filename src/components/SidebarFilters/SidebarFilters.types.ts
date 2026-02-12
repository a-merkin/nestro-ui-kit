import type { DropdownOption } from '../Dropdown/Dropdown.types';

export interface FilterDropdown {
  key: string;
  label: string;
  options: DropdownOption[];
}

export type FilterValue = string | number | null;

export type FilterValues = Record<string, FilterValue>;

export interface SidebarFiltersProps {
  /** Список dropdown-фильтров для отображения */
  filters: FilterDropdown[];
  /** Текущие значения фильтров (key -> value) */
  modelValue: FilterValues;
  /** Ключи фильтров, которые нужно задизейблить */
  disabledFields?: string[];
  /** Ключи фильтров, для которых показывать опцию "Все" */
  showAllOption?: string[];
  /** Включить поиск в dropdown'ах */
  searchable?: boolean;
  /** Показывать кнопки "Применить" / "Очистить" */
  showActions?: boolean;
  /** Текст кнопки "Применить" */
  applyLabel?: string;
  /** Текст кнопки "Очистить" */
  clearLabel?: string;
  /** Заблокировать кнопку "Применить" */
  applyDisabled?: boolean;
  /** Маппинг ключей к русским названиям сущностей для опции "Все" */
  allOptionLabels?: Record<string, string>;
}

export interface SidebarFiltersEmits {
  (e: 'update:modelValue', value: FilterValues): void;
  (e: 'apply'): void;
  (e: 'clear'): void;
  (e: 'filterChange', key: string, value: FilterValue): void;
}
