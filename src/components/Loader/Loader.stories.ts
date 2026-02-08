import type { Meta, StoryObj } from '@storybook/vue3';
import Loader from './Loader.vue';

const meta = {
  title: 'UI/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white'],
    },
    text: { control: 'text' },
    overlay: { control: 'boolean' },
  },
  args: {
    size: 'md',
    variant: 'primary',
    text: '',
    overlay: false,
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithText: Story = {
  args: { text: 'Загрузка...' },
};

export const Small: Story = {
  args: { size: 'sm', text: 'Small' },
};

export const Large: Story = {
  args: { size: 'lg', text: 'Large' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', text: 'Secondary' },
};

export const White: Story = {
  args: { variant: 'white', text: 'White' },
  decorators: [
    () => ({
      template: `
        <div style="background:#333;padding:40px;border-radius:8px;">
          <story />
        </div>
      `,
    }),
  ],
};

export const Overlay: Story = {
  args: {
    size: 'lg',
    variant: 'white',
    text: 'Загружаем...',
    overlay: true,
  },
};
