import type { Meta, StoryObj } from '@storybook/vue3';
import Workplace from '../components/Workplace.vue';

const meta = {
  title: 'UI/Workplace',
  component: Workplace,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Компонент хедера-переключателя для страниц Nestro UI Kit. Позволяет переключаться между разделами.',
      },
    },
  },
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Массив вкладок: label и value',
    },
    modelValue: {
      control: 'text',
      description: 'Текущая активная вкладка (value)',
    },
  },
} satisfies Meta<typeof Workplace>;

export default {
  ...meta,
  decorators: [
    () => ({
      template: `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);">
          <story />
        </div>
      `,
    }),
  ],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { label: 'Сценарии', value: 'scenarios' },
      { label: 'Макропараметры', value: 'macro' },
      { label: 'Исходные данные ФЭМ', value: 'fem-source' },
      { label: 'Исторические данные ФЭМ', value: 'fem-history' },
    ],
    modelValue: 'scenarios',
  },
};
