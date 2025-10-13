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
        <div style="min-height: 100vh; max-height: 100vh; height: 100vh; overflow: auto; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);">
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
      { label: 'Графики', value: 'fem-source' },
      { label: 'Таблица', value: 'fem-history' },
    ],
    modelValue: 'scenarios',
  },
};

export const WithManyContent: Story = {
  render: (args) => ({
    components: { Workplace },
    setup() {
      return { args };
    },
    template: `
      <Workplace v-bind="args">
        <div>
          <h2>Большой контент</h2>
          <p>Это пример большого количества контента внутри слота Workplace.</p>
          <ul>
            <li v-for="i in 30" :key="i">Элемент {{ i }}</li>
          </ul>
          <p>Ниже — еще больше текста для проверки скролла и отображения:</p>
          <div style="height: 600px; background: #f0f4fa; margin: 16px 0; display: flex; align-items: center; justify-content: center;">
            <span>Контент с высотой 600px</span>
          </div>
          <p>Финальный блок текста.</p>
        </div>
      </Workplace>
    `,
  }),
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
