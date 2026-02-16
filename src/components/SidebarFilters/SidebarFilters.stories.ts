import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import NSidebarFilters from './SidebarFilters.vue';
import type { FilterValues } from './SidebarFilters.types';

const meta = {
  title: 'UI/SidebarFilters',
  component: NSidebarFilters,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'object', description: 'Текущие значения фильтров' },
    filters: { control: 'object', description: 'Массив фильтров' },
    disabledFields: { control: 'object', description: 'Задизейбленные поля' },
    showAllOption: { control: 'object', description: 'Фильтры с опцией "Все"' },
    searchable: { control: 'boolean', description: 'Поиск в dropdown' },
    showActions: { control: 'boolean', description: 'Показывать кнопки действий' },
    applyLabel: { control: 'text', description: 'Текст кнопки "Применить"' },
    clearLabel: { control: 'text', description: 'Текст кнопки "Очистить"' },
    applyDisabled: { control: 'boolean', description: 'Заблокировать кнопку "Применить"' },
  },
} satisfies Meta<typeof NSidebarFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultFilters = [
  {
    key: 'do',
    label: 'Организация',
    options: [
      { value: '1', label: 'ООО Нефтедобыча' },
      { value: '2', label: 'ПАО Нефтегаз' },
      { value: '3', label: 'АО Ресурс' },
    ],
  },
  {
    key: 'field',
    label: 'Месторождение',
    options: [
      { value: '10', label: 'Самотлорское' },
      { value: '20', label: 'Ромашкинское' },
      { value: '30', label: 'Приобское' },
    ],
  },
  {
    key: 'well',
    label: 'Скважина',
    options: [
      { value: '100', label: 'Скважина №1' },
      { value: '200', label: 'Скважина №2' },
      { value: '300', label: 'Скважина №3' },
      { value: '400', label: 'Скважина №4' },
    ],
  },
  {
    key: 'plast',
    label: 'Пласт',
    options: [
      { value: 'p1', label: 'АВ1' },
      { value: 'p2', label: 'БВ8' },
      { value: 'p3', label: 'ЮВ1' },
    ],
  },
];

const renderTemplate = (args: any) => ({
  components: { NSidebarFilters },
  setup() {
    const value = ref<FilterValues>(args.modelValue);

    watch(
      () => args.modelValue,
      (v) => (value.value = v)
    );
    watch(value, (v) => (args.modelValue = v));

    const onApply = () => console.log('apply', value.value);
    const onClear = () => console.log('clear');
    const onFilterChange = (key: string, val: any) => console.log('filterChange', key, val);

    return { args, value, onApply, onClear, onFilterChange };
  },
  template: `
    <div style="width: 280px; padding: 16px; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
      <NSidebarFilters
        v-model="value"
        v-bind="args"
        @apply="onApply"
        @clear="onClear"
        @filter-change="onFilterChange"
      />
    </div>
  `,
});

export const Default: Story = {
  args: {
    modelValue: { do: null, field: null, well: null, plast: null },
    filters: defaultFilters,
  },
  render: renderTemplate,
};

export const WithPreselectedValues: Story = {
  name: 'С предустановленными значениями',
  args: {
    modelValue: { do: '1', field: '10', well: null, plast: null },
    filters: defaultFilters,
  },
  render: renderTemplate,
};

export const WithDisabledFields: Story = {
  name: 'С заблокированными полями',
  args: {
    modelValue: { do: '1', field: null, well: null, plast: null },
    filters: defaultFilters,
    disabledFields: ['well', 'plast'],
  },
  render: renderTemplate,
};

export const WithAllOption: Story = {
  name: 'С опцией "Все"',
  args: {
    modelValue: { do: null, field: null, well: null, plast: null },
    filters: defaultFilters,
    showAllOption: ['do', 'field', 'well'],
    allOptionLabels: {
      do: 'организации',
      field: 'месторождения',
      well: 'скважины',
      plast: 'пласты',
    },
  },
  render: renderTemplate,
};

export const WithoutActions: Story = {
  name: 'Без кнопок действий',
  args: {
    modelValue: { do: null, field: null },
    filters: defaultFilters.slice(0, 2),
    showActions: false,
  },
  render: renderTemplate,
};

export const WithAdditionalControls: Story = {
  name: 'С дополнительными контролами',
  args: {
    modelValue: { do: null, field: null },
    filters: defaultFilters.slice(0, 2),
  },
  render: (args: any) => ({
    components: { NSidebarFilters },
    setup() {
      const value = ref<FilterValues>(args.modelValue);
      watch(
        () => args.modelValue,
        (v) => (value.value = v)
      );
      watch(value, (v) => (args.modelValue = v));
      return { args, value };
    },
    template: `
      <div style="width: 280px; padding: 16px; background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
        <NSidebarFilters v-model="value" v-bind="args">
          <template #additional-controls>
            <div style="padding: 8px 0; font-size: 14px; color: #464E56;">
              Дополнительный контрол (слот)
            </div>
          </template>
        </NSidebarFilters>
      </div>
    `,
  }),
};

export const ApplyDisabled: Story = {
  name: 'Кнопка "Применить" заблокирована',
  args: {
    modelValue: { do: null, field: null, well: null, plast: null },
    filters: defaultFilters,
    applyDisabled: true,
  },
  render: renderTemplate,
};
