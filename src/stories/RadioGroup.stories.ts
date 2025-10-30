import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import RadioGroup from '../components/RadioGroup/RadioGroup.vue';
import type { RadioGroupOption } from '../components/RadioGroup/RadioGroup.vue';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Текущее выбранное значение' },
    options: { control: 'object', description: 'Массив опций для выбора' },
    label: { control: 'text', description: 'Заголовок группы' },
    disabled: { control: 'boolean', description: 'Отключить всю группу' },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Направление расположения элементов',
    },
    name: { control: 'text', description: 'Имя группы радио-кнопок' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions: RadioGroupOption[] = [
  { label: 'Вариант 1', value: 'option1' },
  { label: 'Вариант 2', value: 'option2' },
  { label: 'Вариант 3', value: 'option3' },
];

const periodOptions: RadioGroupOption[] = [
  { label: '1 месяц', value: '1month' },
  { label: '1 день', value: '1day' },
  { label: '12 часов', value: '12hours' },
  { label: '1 час', value: '1hour' },
  { label: '1 минута', value: '1minute' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'option1',
    label: 'Выберите вариант',
    disabled: false,
    direction: 'vertical',
  },
  render: (args: any) => ({
    components: { RadioGroup },
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
        <RadioGroup v-model="value" v-bind="restArgs" />
        <p style="margin-top: 16px;">Выбрано: <strong>{{ value }}</strong></p>
      </div>
    `,
  }),
};

export const WithoutLabel: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'option2',
    disabled: false,
    direction: 'vertical',
  },
  render: (args: any) => ({
    components: { RadioGroup },
    setup() {
      const value = ref(args.modelValue);
      watch(() => args.modelValue, (newVal) => (value.value = newVal));
      watch(value, (newVal) => (args.modelValue = newVal));
      const { modelValue, ...restArgs } = args;
      return { restArgs, value };
    },
    template: `<RadioGroup v-model="value" v-bind="restArgs" />`,
  }),
};

export const Horizontal: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'option1',
    label: 'Горизонтальное расположение',
    disabled: false,
    direction: 'horizontal',
  },
  render: (args: any) => ({
    components: { RadioGroup },
    setup() {
      const value = ref(args.modelValue);
      watch(() => args.modelValue, (newVal) => (value.value = newVal));
      watch(value, (newVal) => (args.modelValue = newVal));
      const { modelValue, ...restArgs } = args;
      return { restArgs, value };
    },
    template: `<RadioGroup v-model="value" v-bind="restArgs" />`,
  }),
};

export const Discretization: Story = {
  args: {
    options: periodOptions,
    modelValue: '12hours',
    label: 'Дискретизация',
    disabled: false,
    direction: 'vertical',
  },
  render: (args: any) => ({
    components: { RadioGroup },
    setup() {
      const value = ref(args.modelValue);
      watch(() => args.modelValue, (newVal) => (value.value = newVal));
      watch(value, (newVal) => (args.modelValue = newVal));
      const { modelValue, ...restArgs } = args;
      return { restArgs, value };
    },
    template: `<RadioGroup v-model="value" v-bind="restArgs" />`,
  }),
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    modelValue: 'option2',
    label: 'Отключенная группа',
    disabled: true,
    direction: 'vertical',
  },
  render: (args: any) => ({
    components: { RadioGroup },
    setup() {
      const value = ref(args.modelValue);
      watch(() => args.modelValue, (newVal) => (value.value = newVal));
      watch(value, (newVal) => (args.modelValue = newVal));
      const { modelValue, ...restArgs } = args;
      return { restArgs, value };
    },
    template: `<RadioGroup v-model="value" v-bind="restArgs" />`,
  }),
};
