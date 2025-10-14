import type { Meta, StoryObj } from '@storybook/vue3';
import MultiSelect from '../components/MultiSelect.vue';

const options = [
  { id: 1, name: 'Дебит нефти' },
  { id: 2, name: 'Дебит газа' },
  { id: 3, name: 'Дебит воды' },
  { id: 4, name: 'Давление' },
  { id: 5, name: 'Температура' },
  { id: 6, name: 'Объем' },
  { id: 7, name: 'Скорость' },
  { id: 8, name: 'Вязкость' },
  { id: 9, name: 'Плотность' },
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
      { id: 10, name: 'Концентрация' },
      { id: 11, name: 'Проводимость' },
      { id: 12, name: 'Сопротивление' },
      { id: 13, name: 'Мощность' },
      { id: 14, name: 'Энергия' },
      { id: 15, name: 'Частота' },
      { id: 16, name: 'Ускорение' },
      { id: 17, name: 'Сила' },
      { id: 18, name: 'Момент' },
      { id: 19, name: 'Работа' },
      { id: 20, name: 'Теплоемкость' },
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
