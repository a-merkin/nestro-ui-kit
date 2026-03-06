import type { FilterGroup, FilterGroupItem } from 'nestro-ui-kit';

export const workplaceTabs = [
  { label: 'Основное', value: 'main' },
  { label: 'Фильтры', value: 'filters' },
  { label: 'Форма', value: 'form' },
  { label: 'Оверлеи', value: 'overlays' },
];

export const availableFilters: FilterGroupItem[] = [
  {
    id: 'f1',
    key: 'status',
    label: 'Статус',
    type: 'dropdown',
    order: 1,
    config: {
      options: [
        { label: 'Активный', value: 'active' },
        { label: 'Архив', value: 'archive' },
      ],
    },
  },
  {
    id: 'f2',
    key: 'category',
    label: 'Категория',
    type: 'multiselect',
    order: 2,
    config: {
      options: [
        { label: 'Электроника', value: 'electronics' },
        { label: 'Одежда', value: 'clothes' },
      ],
    },
  },
  {
    id: 'f3',
    key: 'price',
    label: 'Цена',
    type: 'number',
    order: 3,
    config: { min: 0, max: 100000 },
  },
  { id: 'f4', key: 'created_at', label: 'Дата создания', type: 'date', order: 4 },
  { id: 'f5', key: 'is_active', label: 'Активен', type: 'boolean', order: 5 },
];

export const filterGroups: FilterGroup[] = [
  {
    id: 'g1',
    name: 'Активные товары',
    moduleId: 'products',
    isSystem: false,
    isDefault: true,
    items: [availableFilters[0], availableFilters[2]],
    values: { status: 'active', price: null },
  },
  {
    id: 'g2',
    name: 'Архив',
    moduleId: 'products',
    isSystem: false,
    isDefault: false,
    items: [availableFilters[0]],
    values: { status: 'archive' },
  },
];
