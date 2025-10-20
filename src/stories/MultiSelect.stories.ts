import type { Meta, StoryObj } from '@storybook/vue3';
import MultiSelect from '../components/MultiSelect.vue';

const options = [
  { value: 1, label: 'Дебит нефти' },
  { value: 2, label: 'Дебит газа' },
  { value: 3, label: 'Дебит воды' },
  { value: 4, label: 'Давление' },
  { value: 5, label: 'Температура' },
  { value: 6, label: 'Объем' },
  { value: 7, label: 'Скорость' },
  { value: 8, label: 'Вязкость' },
  { value: 9, label: 'Плотность' },
];

const meta = {
  title: 'UI/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'object',
      description: 'Массив выбранных значений',
    },
    options: {
      control: 'object',
      description: 'Массив доступных опций',
    },
    searchable: {
      control: 'boolean',
      description: 'Включить поиск среди опций',
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    modelValue: [1, 2, 4, 5, 6, 7, 8, 9],
  },
  render: (args) => ({
    components: { MultiSelect },
    setup: () => ({ args }),
    template: '<MultiSelect v-bind="args" />',
  }),
};

export const WithSearch: Story = {
  args: {
    options,
    modelValue: [1, 2, 4],
    searchable: true,
  },
  render: (args) => ({
    components: { MultiSelect },
    setup: () => ({ args }),
    template: '<MultiSelect v-bind="args" />',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Мультиселект с функцией поиска. Кликните в область с чипсами и начните печатать для фильтрации опций.',
      },
    },
  },
};

export const SearchWithManyOptions: Story = {
  args: {
    options: [
      ...options,
      { value: 10, label: 'Концентрация' },
      { value: 11, label: 'Проводимость' },
      { value: 12, label: 'Сопротивление' },
      { value: 13, label: 'Мощность' },
      { value: 14, label: 'Энергия' },
      { value: 15, label: 'Частота' },
      { value: 16, label: 'Ускорение' },
      { value: 17, label: 'Сила' },
      { value: 18, label: 'Момент' },
      { value: 19, label: 'Работа' },
      { value: 20, label: 'Теплоемкость' },
    ],
    modelValue: [1, 5, 10, 15],
    searchable: true,
  },
  render: (args) => ({
    components: { MultiSelect },
    setup: () => ({ args }),
    template: '<MultiSelect v-bind="args" />',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Мультиселект с большим количеством опций и поиском. Попробуйте найти "дебит" или "сила".',
      },
    },
  },
};

export const EmptyWithSearch: Story = {
  args: {
    options,
    modelValue: [],
    searchable: true,
  },
  render: (args) => ({
    components: { MultiSelect },
    setup: () => ({ args }),
    template: '<MultiSelect v-bind="args" />',
  }),
  parameters: {
    docs: {
      description: {
        story: 'Пустой мультиселект с поиском. Начните печатать для поиска и выбора опций.',
      },
    },
  },
};
