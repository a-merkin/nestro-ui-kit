import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';
import type { ButtonVariant } from './Button.types';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text', 'circle'] satisfies ButtonVariant[],
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
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

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
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <template #icon-left>👈</template>
        Кнопка
        <template #icon-right>👉</template>
      </Button>
    `,
  }),
};

export const Circle: Story = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args" variant="circle">
        ⭐
      </Button>
    `,
  }),
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    default: 'Загрузка',
  },
};
