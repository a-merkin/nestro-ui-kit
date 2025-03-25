import type { Meta, StoryObj } from '@storybook/vue3';
import Dropdown from '../components/Dropdown/Dropdown.vue';

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Выбранное значение',
    },
    options: {
      control: 'object',
      description: 'Массив опций для выбора',
    },
    placeholder: {
      control: 'text',
      description: 'Текст подсказки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключен ли дропдаун',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: '1', label: 'Опция 1' },
  { value: '2', label: 'Опция 2' },
  { value: '3', label: 'Опция 3' },
];

export const Default: Story = {
  args: {
    modelValue: '',
    options: defaultOptions,
    placeholder: 'Выберите опцию',
  },
};

export const WithSelectedValue: Story = {
  args: {
    modelValue: '2',
    options: defaultOptions,
  },
};

export const Disabled: Story = {
  args: {
    modelValue: '',
    options: defaultOptions,
    disabled: true,
    placeholder: 'Недоступный дропдаун',
  },
};

export const WithManyOptions: Story = {
  args: {
    modelValue: '',
    options: [
      { value: '1', label: 'Очень длинная опция номер один' },
      { value: '2', label: 'Опция 2' },
      { value: '3', label: 'Опция 3' },
      { value: '4', label: 'Опция 4' },
      { value: '5', label: 'Опция 5' },
      { value: '6', label: 'Опция 6' },
      { value: '7', label: 'Опция 7' },
    ],
    placeholder: 'Выберите из списка',
  },
}; 