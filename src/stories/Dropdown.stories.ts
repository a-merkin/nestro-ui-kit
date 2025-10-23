import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import Dropdown from '../components/Dropdown/Dropdown.vue';

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Выбранное значение' },
    options: { control: 'object', description: 'Массив опций для выбора' },
    placeholder: { control: 'text', description: 'Текст подсказки' },
    disabled: { control: 'boolean', description: 'Отключен ли дропдаун' },
    searchable: { control: 'boolean', description: 'Включить поиск в основном поле ввода' },
    valueKey: { control: 'text', description: 'Ключ для значения опции' },
    labelKey: { control: 'text', description: 'Ключ для отображаемого текста опции' },
  },
} satisfies Meta<typeof Dropdown>;

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
  components: { Dropdown },
  setup() {
    const value = ref(args.modelValue);

    watch(
      () => args.modelValue,
      (newVal) => (value.value = newVal)
    );
    watch(value, (newVal) => (args.modelValue = newVal));

    return { args, value };
  },
  template: `
    <div>
      <Dropdown v-model="value" v-bind="args" />
    </div>
  `,
});

export const Default: Story = {
  args: {
    modelValue: '',
    options: defaultOptions,
    placeholder: 'Выберите опцию',
  },
  render: renderTemplate,
};

export const WithPlaceholder: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    placeholder: 'Например: Выбери пункт',
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

export const Disabled: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    disabled: true,
    placeholder: 'Дропдаун неактивен',
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

export const Loading: Story = {
  args: {
    modelValue: null,
    options: defaultOptions,
    placeholder: 'Загрузка...',
    loading: true,
    disabled: true,
  },
  render: renderTemplate,
};

export const WithLabel: Story = {
  name: 'With Label',
  args: {
    modelValue: null,
    options: defaultOptions,
    placeholder: 'Выберите значение',
    label: 'Выбор опции',
  },
  render: renderTemplate,
};
