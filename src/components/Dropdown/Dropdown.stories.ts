import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import NDropdown from './Dropdown.vue';

const meta = {
  title: 'UI/Dropdown',
  component: NDropdown,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Выбранное значение' },
    options: { control: 'object', description: 'Массив опций' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    valueKey: { control: 'text' },
    labelKey: { control: 'text' },
    loading: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof NDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
];

const customKeyOptions = [
  { id: 'user_1', name: 'Иван Иванов', email: 'ivan@example.com' },
  { id: 'user_2', name: 'Петр Петров', email: 'petr@example.com' },
  { id: 'user_3', name: 'Мария Сидорова', email: 'maria@example.com' },
  { id: 'user_4', name: 'Анна Козлова', email: 'anna@example.com' },
];

const renderTemplate = (args: any) => ({
  components: { NDropdown },
  setup() {
    const value = ref(args.modelValue);

    watch(
      () => args.modelValue,
      (v) => (value.value = v)
    );
    watch(value, (v) => (args.modelValue = v));

    return { args, value };
  },
  template: `<NDropdown v-model="value" v-bind="args" />`,
});

export const Default: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    placeholder: 'Выберите опцию',
  },
  render: renderTemplate,
};

export const Searchable: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    searchable: true,
    placeholder: 'Введите для поиска...',
  },
  render: renderTemplate,
};

export const Clearable: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    clearable: true,
    placeholder: 'Выберите значение',
  },
  render: renderTemplate,
};

export const Disabled: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    disabled: true,
    placeholder: 'Недоступно',
  },
  render: renderTemplate,
};

export const Loading: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    loading: true,
    disabled: true,
    placeholder: 'Загрузка...',
  },
  render: renderTemplate,
};

export const WithLabel: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    label: 'Выбор опции',
    placeholder: 'Выберите значение',
  },
  render: renderTemplate,
};

export const CustomValueLabelKeys: Story = {
  name: 'С кастомными ключами',
  args: {
    modelValue: null,
    options: customKeyOptions,
    valueKey: 'id',
    labelKey: 'name',
    placeholder: 'Выберите пользователя',
    clearable: true,
  },
  render: renderTemplate,
};

export const WithOptionTooltip: Story = {
  name: 'With option tooltip',
  args: {
    modelValue: null,
    options: [
      { value: '1', label: 'Очень длинное название опции номер один' },
      { value: '2', label: 'Коротко' },
      { value: '3', label: 'Еще одна супер длинная опция с текстом' },
    ],
    placeholder: 'Выберите опцию',
    showOptionTooltip: true,
  },
  render: (args) => ({
    components: { NDropdown },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div style="width: 220px">
        <NDropdown v-model="value" v-bind="args" />
      </div>
    `,
  }),
};
