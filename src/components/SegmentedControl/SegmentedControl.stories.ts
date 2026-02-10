import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import SegmentedControl from './SegmentedControl.vue';
import type { SegmentedControlOption } from './SegmentedControl.types';

const meta = {
  title: 'UI/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Список сегментов',
    },
    modelValue: {
      control: { type: 'text' },
      description: 'Выбранное значение (v-model)',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключённое состояние',
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
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <SegmentedControl v-model="value" v-bind="args" />
        <p style="margin-top: 16px;">Выбрано: <strong>{{ value }}</strong></p>
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
  },
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `<SegmentedControl v-model="value" v-bind="args" />`,
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
  },
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <div>
        <SegmentedControl v-model="value" v-bind="args" />
        <p style="margin-top: 16px;">Выбрано: <strong>{{ value }}</strong></p>
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

export const CustomSegment: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'day',
  },
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);
      return { args, value };
    },
    template: `
      <SegmentedControl v-model="value" v-bind="args">
        <template #segment="{ option, active }">
          <span :style="{ fontWeight: active ? 700 : 500 }">
            {{ option.label.toUpperCase() }}
          </span>
        </template>
      </SegmentedControl>
    `,
  }),
};
