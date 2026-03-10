import type { Meta, StoryObj } from '@storybook/vue3';
import Breadcrumbs from './Breadcrumbs.vue';

const meta = {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент хлебных крошек. Показывает части сценария, разделённые кружками.',
      },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scenarioParts: ['Зарубежнефть', 'ЗНДХ', 'Харьягинское', 'Иванов И.И', 'Консолидация'],
  },
};
