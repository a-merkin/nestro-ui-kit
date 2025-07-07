import type { Meta, StoryObj } from '@storybook/vue3';
import MultiSelect from '../components/MultiSelect.vue';

const options = [
  { id: 1, name: 'Дебит нефти' },
  { id: 2, name: 'Дебит газа' },
  { id: 3, name: 'Дебит воды' },
  { id: 4, name: 'Давление' },
  { id: 5, name: 'Температура' },
  { id: 6, name: 'Объем' },
  { id: 7, name: 'Скорость' },
  { id: 8, name: 'Вязкость' },
  { id: 9, name: 'Плотность' },
];

const meta = {
  title: 'UI/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Мультиселект - Позволяет выбирать несколько элементов из списка.',
      },
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options,
    modelValue: [1, 2, 4, 5, 6, 7, 8, 9],
  },
  render: (args) => ({
    components: { MultiSelect },
    setup: () => ({ args }),
    template: '<MultiSelect v-bind="args" />',
  }),
};
