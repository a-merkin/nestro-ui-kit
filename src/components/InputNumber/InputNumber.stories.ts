import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import NInputNumber from './InputNumber.vue';

const meta = {
  title: 'UI/InputNumber',
  component: NInputNumber,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'number', description: 'Числовое значение' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    minFractionDigits: { control: 'number' },
    maxFractionDigits: { control: 'number' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    showButtons: { control: 'boolean' },
    buttonLayout: { control: 'select', options: ['stacked', 'horizontal'] },
    useGrouping: { control: 'boolean' },
  },
} satisfies Meta<typeof NInputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderTemplate = (args: any) => ({
  components: { NInputNumber },
  setup() {
    const value = ref(args.modelValue);

    watch(
      () => args.modelValue,
      (v) => (value.value = v)
    );
    watch(value, (v) => (args.modelValue = v));

    return { args, value };
  },
  template: `<NInputNumber v-model="value" v-bind="args" />`,
});

export const Default: Story = {
  args: {
    modelValue: null,
    placeholder: 'Введите число',
  },
  render: renderTemplate,
};

export const WithLabel: Story = {
  name: 'С лейблом',
  args: {
    modelValue: 42,
    label: 'Количество',
  },
  render: renderTemplate,
};

export const WithMinMax: Story = {
  name: 'С ограничениями min/max',
  args: {
    modelValue: 50,
    min: 0,
    max: 100,
    label: 'Значение (0-100)',
  },
  render: renderTemplate,
};

export const FractionDigits: Story = {
  name: 'Дробные числа',
  args: {
    modelValue: 3.14,
    minFractionDigits: 2,
    maxFractionDigits: 5,
    label: 'Точность',
    step: 0.01,
  },
  render: renderTemplate,
};

export const WithSuffix: Story = {
  name: 'С суффиксом',
  args: {
    modelValue: 25,
    suffix: ' км',
    label: 'Расстояние',
  },
  render: renderTemplate,
};

export const WithPrefix: Story = {
  name: 'С префиксом',
  args: {
    modelValue: 1500,
    prefix: '₽ ',
    label: 'Стоимость',
    useGrouping: true,
  },
  render: renderTemplate,
};

export const ButtonsStacked: Story = {
  name: 'Кнопки stacked',
  args: {
    modelValue: 10,
    showButtons: true,
    buttonLayout: 'stacked',
    min: 0,
    max: 100,
    label: 'Количество',
  },
  render: renderTemplate,
};

export const ButtonsHorizontal: Story = {
  name: 'Кнопки horizontal',
  args: {
    modelValue: 5,
    showButtons: true,
    buttonLayout: 'horizontal',
    min: 0,
    max: 20,
    label: 'Количество',
  },
  render: renderTemplate,
};

export const StepDecimal: Story = {
  name: 'Шаг 0.25',
  args: {
    modelValue: 1.0,
    showButtons: true,
    buttonLayout: 'horizontal',
    step: 0.25,
    minFractionDigits: 2,
    maxFractionDigits: 2,
    min: 0,
    max: 10,
    label: 'Значение',
  },
  render: renderTemplate,
};

export const Temperature: Story = {
  name: 'Температура',
  args: {
    modelValue: 36.6,
    suffix: ' °C',
    showButtons: true,
    buttonLayout: 'horizontal',
    step: 0.1,
    minFractionDigits: 1,
    maxFractionDigits: 1,
    min: 0,
    max: 100,
    label: 'Температура',
  },
  render: renderTemplate,
};

export const Grouping: Story = {
  name: 'С разделением тысяч',
  args: {
    modelValue: 1234567,
    useGrouping: true,
    label: 'Население',
    suffix: ' чел.',
  },
  render: renderTemplate,
};

export const Disabled: Story = {
  name: 'Заблокирован',
  args: {
    modelValue: 42,
    disabled: true,
    label: 'Значение',
  },
  render: renderTemplate,
};

export const WithError: Story = {
  name: 'С ошибкой',
  args: {
    modelValue: null,
    error: true,
    errorMessage: 'Обязательное поле',
    label: 'Глубина скважины',
    placeholder: 'Введите глубину',
  },
  render: renderTemplate,
};
