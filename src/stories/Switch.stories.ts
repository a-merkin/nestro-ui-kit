import type { Meta, StoryObj } from '@storybook/vue3';
import Switch from '../components/Switch/Switch.vue';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Значение переключателя',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключен ли переключатель',
    },
    default: {
      control: 'text',
      description: 'Текст метки переключателя',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
    default: 'Переключатель',
  },
};

export const Checked: Story = {
  args: {
    modelValue: true,
    default: 'Включенный переключатель',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: false,
    disabled: true,
    default: 'Отключенный переключатель',
  },
};

export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    disabled: true,
    default: 'Отключенный включенный переключатель',
  },
};

export const WithoutLabel: Story = {
  args: {
    modelValue: false,
  },
};
