import type { Meta, StoryObj } from '@storybook/vue3';
import Loader from '../components/Loader/Loader.vue';

const meta = {
  title: 'UI/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Размер лоадера',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'white'],
      description: 'Цветовой вариант лоадера',
    },
    text: {
      control: 'text',
      description: 'Текст под лоадером',
    },
    overlay: {
      control: 'boolean',
      description: 'Показывать как оверлей на весь экран',
    },
  },
  args: {
    size: 'medium',
    variant: 'primary',
    text: '',
    overlay: false,
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Основной пример
export const Default: Story = {
  args: {
    size: 'medium',
    variant: 'primary',
  },
};

// С текстом
export const WithText: Story = {
  args: {
    size: 'medium',
    variant: 'primary',
    text: 'Загрузка...',
  },
};

// Маленький размер
export const Small: Story = {
  args: {
    size: 'small',
    variant: 'primary',
    text: 'Загрузка',
  },
};

// Большой размер
export const Large: Story = {
  args: {
    size: 'large',
    variant: 'primary',
    text: 'Загружаем данные...',
  },
};

// Серый вариант
export const Secondary: Story = {
  args: {
    size: 'medium',
    variant: 'secondary',
    text: 'Подождите',
  },
};

// Белый вариант (на темном фоне)
export const White: Story = {
  args: {
    size: 'medium',
    variant: 'white',
    text: 'Загрузка...',
  },
  decorators: [
    () => ({
      template: `
        <div style="background-color: #333; padding: 40px; border-radius: 8px;">
          <story />
        </div>
      `,
    }),
  ],
};

// Все размеры вместе
export const AllSizes: Story = {
  render: () => ({
    components: { Loader },
    template: `
      <div style="display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <Loader size="small" text="Маленький" />
        </div>
        <div style="text-align: center;">
          <Loader size="medium" text="Средний" />
        </div>
        <div style="text-align: center;">
          <Loader size="large" text="Большой" />
        </div>
      </div>
    `,
  }),
};

// Все варианты цветов
export const AllVariants: Story = {
  render: () => ({
    components: { Loader },
    template: `
      <div style="display: flex; gap: 40px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <Loader variant="primary" text="Primary" />
        </div>
        <div style="text-align: center;">
          <Loader variant="secondary" text="Secondary" />
        </div>
        <div style="text-align: center; background-color: #333; padding: 20px; border-radius: 8px;">
          <Loader variant="white" text="White" />
        </div>
      </div>
    `,
  }),
};

// Оверлей (осторожно - блокирует весь интерфейс)
export const Overlay: Story = {
  args: {
    size: 'large',
    variant: 'white',
    text: 'Загружаем контент...',
    overlay: true,
  },
  parameters: {
    docs: {
      description: {
        story: '⚠️ Внимание: Этот пример блокирует весь интерфейс. Используйте осторожно!',
      },
    },
  },
};
