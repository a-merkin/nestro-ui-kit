import type { Meta, StoryObj } from '@storybook/vue3';
import CurrentScenario from '../components/CurrentScenario.vue';

const meta = {
  title: 'UI/CurrentScenario',
  component: CurrentScenario,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Компонент текущего сценария из макета Figma. Показывает части сценария, разделённые кружками.',
      },
    },
  },
} satisfies Meta<typeof CurrentScenario>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scenarioParts: ['Зарубежнефть', 'ЗНДХ', 'Харьягинское', 'Иванов И.И', 'Консолидация'],
  },
};
