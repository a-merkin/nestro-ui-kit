import type { Meta, StoryObj } from '@storybook/vue3';
import ProgressBar from '../components/ProgressBar/ProgressBar.vue';

const meta = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Значение прогресса от 0 до 100',
    },
    showLabel: {
      control: 'boolean',
      description: 'Показывать ли текст с процентами',
    },
    width: {
      control: { type: 'range', min: 100, max: 400, step: 10 },
      description: 'Ширина прогресс-бара в пикселях',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 55,
    showLabel: true,
    width: 200,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    showLabel: true,
    width: 200,
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    showLabel: true,
    width: 200,
  },
};

export const WithoutLabel: Story = {
  args: {
    value: 75,
    showLabel: false,
    width: 200,
  },
};

export const Small: Story = {
  args: {
    value: 30,
    showLabel: true,
    width: 120,
  },
};

export const Large: Story = {
  args: {
    value: 80,
    showLabel: true,
    width: 300,
  },
};

export const LowProgress: Story = {
  args: {
    value: 15,
    showLabel: true,
    width: 200,
  },
};

export const HighProgress: Story = {
  args: {
    value: 90,
    showLabel: true,
    width: 200,
  },
};
