import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../components/Button/Button.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'UI/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text', 'circle'],
      description: 'Вариант кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключена ли кнопка',
    },
    loading: {
      control: 'boolean',
      description: 'Показывать индикатор загрузки',
    },
    default: {
      control: 'text',
      description: 'Текст кнопки',
    },
    'icon-left': {
      control: 'text',
      description: 'Слот для иконки слева',
    },
    'icon-right': {
      control: 'text',
      description: 'Слот для иконки справа',
    },
  },
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    default: 'Кнопка',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    default: 'Кнопка',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    default: 'Кнопка',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    default: 'Кнопка',
  },
};

export const WithIcons: Story = {
  args: {
    default: 'Кнопка',
    'icon-left': '👈',
    'icon-right': '👉',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    'icon-left': '⭐',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    default: 'Загрузка',
  },
};
