import type { FilterGroup, FilterGroupItem } from 'nestro-ui-kit';

export const breadcrumbs = ['Зарубежнефть', 'ЗНДХ', 'Харьягинское', 'Иванов И.И', 'Препроцессор'];

export const oilBreadcrumbs = ['Нефтяной инжиниринг', 'Харьягинское', 'Скважины'];

export const navBarItems = [
  { id: 'main', icon: 'bookmark' as const },
  { id: 'catalog', icon: 'unite' as const },
  { id: 'settings', icon: 'setting' as const },
  { id: 'download', icon: 'download' as const },
];

export const workplaceTabs = [
  { label: 'Основное', value: 'main' },
  { label: 'Фильтры', value: 'filters' },
  { label: 'Форма', value: 'form' },
  { label: 'Оверлеи', value: 'overlays' },
];

export const oilToolTabs = [
  { label: 'Обзор', value: 'overview' },
  { label: 'Скважины', value: 'wells' },
  { label: 'Анализ', value: 'analysis' },
];

export const oilToolFilters = [
  {
    key: 'field',
    label: 'Месторождение',
    options: [
      { label: 'Харьягинское', value: 'kharyaga' },
      { label: 'Тимано-Печорское', value: 'timano' },
      { label: 'Сахалин-1', value: 'sakhalin' },
    ],
  },
  {
    key: 'well_type',
    label: 'Тип скважины',
    options: [
      { label: 'Добывающая', value: 'production' },
      { label: 'Нагнетательная', value: 'injection' },
      { label: 'Разведочная', value: 'exploration' },
    ],
  },
  {
    key: 'status',
    label: 'Статус',
    options: [
      { label: 'Активная', value: 'active' },
      { label: 'В ремонте', value: 'repair' },
      { label: 'Остановлена', value: 'stopped' },
    ],
  },
  {
    key: 'horizon',
    label: 'Горизонт',
    options: [
      { label: 'Д0', value: 'd0' },
      { label: 'Д1', value: 'd1' },
      { label: 'Д2', value: 'd2' },
    ],
  },
];

export const oilAvailableFilters: FilterGroupItem[] = [
  {
    id: 'of1',
    key: 'field',
    label: 'Месторождение',
    type: 'dropdown',
    order: 1,
    config: {
      options: [
        { label: 'Харьягинское', value: 'kharyaga' },
        { label: 'Тимано-Печорское', value: 'timano' },
      ],
    },
  },
  {
    id: 'of2',
    key: 'well_type',
    label: 'Тип скважины',
    type: 'dropdown',
    order: 2,
    config: {
      options: [
        { label: 'Добывающая', value: 'production' },
        { label: 'Нагнетательная', value: 'injection' },
      ],
    },
  },
  {
    id: 'of3',
    key: 'status',
    label: 'Статус',
    type: 'dropdown',
    order: 3,
    config: {
      options: [
        { label: 'Активная', value: 'active' },
        { label: 'В ремонте', value: 'repair' },
      ],
    },
  },
];

export const oilFilterGroups: FilterGroup[] = [
  {
    id: 'og1',
    name: 'Активные скважины',
    moduleId: 'oil',
    isSystem: false,
    isDefault: true,
    items: [oilAvailableFilters[0], oilAvailableFilters[2]],
    values: { status: 'active' },
  },
  {
    id: 'og2',
    name: 'Нагнетательные',
    moduleId: 'oil',
    isSystem: false,
    isDefault: false,
    items: [oilAvailableFilters[1]],
    values: { well_type: 'injection' },
  },
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
