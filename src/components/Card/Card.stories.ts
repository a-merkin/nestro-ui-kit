import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Card from './Card.vue';
import type { CardPadding, CardVariant } from './Card.types';

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'] satisfies CardVariant[],
      description: 'Вариант карточки',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'] satisfies CardPadding[],
      description: 'Внутренние отступы контента (body)',
    },
    clickable: {
      control: 'boolean',
      description: 'Делает карточку кликабельной',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключает кликабельность и взаимодействие',
    },
    tag: {
      control: 'text',
      description: 'HTML-тег корневого элемента (div/section/article...)',
    },
    default: {
      control: 'text',
      description: 'Контент карточки (default slot)',
    },
    header: {
      control: 'text',
      description: 'Слот header',
    },
    footer: {
      control: 'text',
      description: 'Слот footer',
    },
  },
  args: {
    onClick: fn(),
    variant: 'default',
    padding: 'md',
    clickable: false,
    disabled: false,
    tag: 'div',
    default: 'Контент карточки',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    default: 'Контент карточки',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    default: 'Outlined карточка',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    default: 'Elevated карточка (с тенью)',
  },
};

export const PaddingNone: Story = {
  args: {
    padding: 'none',
    default: 'Padding: none',
  },
};

export const PaddingSm: Story = {
  args: {
    padding: 'sm',
    default: 'Padding: sm',
  },
};

export const PaddingLg: Story = {
  args: {
    padding: 'lg',
    default: 'Padding: lg',
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    default: 'Кликабельная карточка (нажми)',
  },
};

export const Disabled: Story = {
  args: {
    clickable: true,
    disabled: true,
    default: 'Disabled карточка',
  },
};

export const WithHeaderAndFooter: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <Card v-bind="args">
        <template #header>
          <div style="display:flex; align-items:center; justify-content:space-between; gap: 12px;">
            <div style="font-weight: 600;">Заголовок</div>
            <div style="opacity:.7; font-size: 12px;">meta</div>
          </div>
        </template>

        <div style="display:grid; gap: 8px;">
          <div style="font-weight: 500;">Основной контент</div>
          <div style="opacity:.8;">
            Здесь может быть любой контент: текст, кнопки, формы, списки и т.д.
          </div>
        </div>

        <template #footer>
          <div style="display:flex; align-items:center; justify-content:flex-end; gap: 8px;">
            <button style="padding: 6px 10px; border-radius: 10px; border: 1px solid #ddd; background: #fff; cursor:pointer;">
              Отмена
            </button>
            <button style="padding: 6px 10px; border-radius: 10px; border: 1px solid transparent; background: #16a34a; color:#fff; cursor:pointer;">
              Применить
            </button>
          </div>
        </template>
      </Card>
    `,
  }),
  args: {
    variant: 'outlined',
    clickable: true,
  },
};

export const AsArticleTag: Story = {
  args: {
    tag: 'article',
    variant: 'outlined',
    default: 'Card с tag="article"',
  },
};
