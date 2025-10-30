import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
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
    'update:modelValue': {
      action: 'update:modelValue',
    },
    change: {
      action: 'change',
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

      watch(
        () => args.modelValue,
        (newVal) => {
          value.value = newVal;
        }
      );

      watch(value, (newVal) => {
        args.modelValue = newVal;
      });

      const handleChange = (val: string | number) => {
        console.log('Выбрано:', val);
      };

      // Исключаем modelValue из args для избежания конфликта с v-model
      const { modelValue, ...restArgs } = args;

      return { restArgs, value, handleChange };
    },
    template: `
      <div>
        <SegmentedControl 
          v-model="value"
          v-bind="restArgs"
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
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);

      watch(
        () => args.modelValue,
        (newVal) => {
          value.value = newVal;
        }
      );

      watch(value, (newVal) => {
        args.modelValue = newVal;
      });

      const { modelValue, ...restArgs } = args;

      return { restArgs, value };
    },
    template: `
      <SegmentedControl 
        v-model="value"
        v-bind="restArgs"
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
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);

      watch(
        () => args.modelValue,
        (newVal) => {
          value.value = newVal;
        }
      );

      watch(value, (newVal) => {
        args.modelValue = newVal;
      });

      const { modelValue, ...restArgs } = args;

      return { restArgs, value };
    },
    template: `
      <SegmentedControl 
        v-model="value"
        v-bind="restArgs"
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
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);

      watch(
        () => args.modelValue,
        (newVal) => {
          value.value = newVal;
        }
      );

      watch(value, (newVal) => {
        args.modelValue = newVal;
      });

      const { modelValue, ...restArgs } = args;

      return { restArgs, value };
    },
    template: `
      <div>
        <SegmentedControl 
          v-model="value"
          v-bind="restArgs"
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
  render: (args) => ({
    components: { SegmentedControl },
    setup() {
      const value = ref(args.modelValue);

      watch(
        () => args.modelValue,
        (newVal) => {
          value.value = newVal;
        }
      );

      watch(value, (newVal) => {
        args.modelValue = newVal;
      });

      const { modelValue, ...restArgs } = args;

      return { restArgs, value };
    },
    template: `
      <SegmentedControl 
        v-model="value"
        v-bind="restArgs"
      />
    `,
  }),
};
