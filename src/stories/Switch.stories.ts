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
    labelBefore: {
      control: 'text',
      description: 'Текст метки до переключателя',
    },
    labelAfter: {
      control: 'text',
      description: 'Текст метки после переключателя',
    },
    default: {
      control: 'text',
      description: 'Текст метки переключателя (устаревший слот, используйте labelAfter)',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
    labelAfter: 'Переключатель',
  },
};

export const Checked: Story = {
  args: {
    modelValue: true,
    labelAfter: 'Включенный переключатель',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: false,
    disabled: true,
    labelAfter: 'Отключенный переключатель',
  },
};

export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    disabled: true,
    labelBefore: 'Выкл',
    labelAfter: 'Вкл',
  },
};

export const WithoutLabel: Story = {
  args: {
    modelValue: false,
  },
};

export const WithTwoLabels: Story = {
  args: {
    modelValue: false,
    labelBefore: 'Выкл',
    labelAfter: 'Вкл',
  },
};

export const WithTwoLabelsChecked: Story = {
  args: {
    modelValue: true,
    labelBefore: 'Выкл',
    labelAfter: 'Вкл',
  },
};

export const OnlyLabelBefore: Story = {
  args: {
    modelValue: false,
    labelBefore: 'Переключатель слева',
  },
};
