import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import SegmentedControl from '../components/SegmentedControl/SegmentedControl.vue';
import type { SegmentedControlOption } from '../components/SegmentedControl/SegmentedControl.vue';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Массив опций для отображения в сегментированном контроле',
    },
    modelValue: {
      control: { type: 'text' },
      description: 'Текущее выбранное значение',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить компонент',
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions: SegmentedControlOption[] = [
  { label: 'День', value: 'day' },
  { label: 'Неделя', value: 'week' },
  { label: 'Месяц', value: 'month' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'month',
    disabled: false,
  },
  render: (args: any) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);

      const handleChange = (val: string | number) => {
        console.log('Выбрано:', val);
      };

      return { args, value, handleChange };
    },
    template: `
      <div>
        <SegmentedControl 
          v-model="value"
          :options="args.options"
          :disabled="args.disabled"
          @change="handleChange"
        />
        <p style="margin-top: 16px;">Выбранное значение: <strong>{{ value }}</strong></p>
      </div>
    `,
  }),
};

export const TwoOptions: Story = {
  args: {
    options: [
      { label: 'Список', value: 'list' },
      { label: 'Сетка', value: 'grid' },
    ],
    modelValue: 'list',
    disabled: false,
  },
  render: (args: any) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <SegmentedControl 
        v-model="value"
        :options="args.options"
        :disabled="args.disabled"
      />
    `,
  }),
};

export const FourOptions: Story = {
  args: {
    options: [
      { label: 'Все', value: 'all' },
      { label: 'Активные', value: 'active' },
      { label: 'Завершенные', value: 'completed' },
      { label: 'Архив', value: 'archived' },
    ],
    modelValue: 'all',
    disabled: false,
  },
  render: (args: any) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <SegmentedControl 
        v-model="value"
        :options="args.options"
        :disabled="args.disabled"
      />
    `,
  }),
};

export const WithNumbers: Story = {
  args: {
    options: [
      { label: '1 год', value: 1 },
      { label: '3 года', value: 3 },
      { label: '5 лет', value: 5 },
    ],
    modelValue: 1,
    disabled: false,
  },
  render: (args: any) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <SegmentedControl 
          v-model="value"
          :options="args.options"
          :disabled="args.disabled"
        />
        <p style="margin-top: 16px;">Выбрано: <strong>{{ value }} {{ value === 1 ? 'год' : value < 5 ? 'года' : 'лет' }}</strong></p>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'week',
    disabled: true,
  },
};

export const LongLabels: Story = {
  args: {
    options: [
      { label: 'Первый вариант', value: 'option1' },
      { label: 'Второй вариант выбора', value: 'option2' },
      { label: 'Третий', value: 'option3' },
    ],
    modelValue: 'option1',
    disabled: false,
  },
  render: (args: any) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <SegmentedControl 
        v-model="value"
        :options="args.options"
        :disabled="args.disabled"
      />
    `,
  }),
};
