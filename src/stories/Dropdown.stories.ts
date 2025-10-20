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
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
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
    modelValue: 2,
    options: defaultOptions,
    disabled: true,
    placeholder: 'Дропдаун неактивен',
  },
  render: renderTemplate,
};
