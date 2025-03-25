import type { Meta, StoryObj } from '@storybook/vue3';
import Checkbox from '../components/Checkbox/Checkbox.vue';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Значение чекбокса',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключен ли чекбокс',
    },
    default: {
      control: 'text',
      description: 'Текст метки чекбокса',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
    default: 'Чекбокс',
  },
};

export const Checked: Story = {
  args: {
    modelValue: true,
    default: 'Отмеченный чекбокс',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: false,
    disabled: true,
    default: 'Отключенный чекбокс',
  },
};

export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    disabled: true,
    default: 'Отключенный отмеченный чекбокс',
  },
};

export const WithoutLabel: Story = {
  args: {
    modelValue: false,
  },
}; 