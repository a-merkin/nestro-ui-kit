import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, watch } from 'vue';
import NDatePicker from './DatePicker.vue';

const meta = {
  title: 'UI/DatePicker',
  component: NDatePicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'text', description: 'Выбранная дата (YYYY-MM-DD)' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    label: { control: 'text' },
    minDate: { control: 'text' },
    maxDate: { control: 'text' },
    clearable: { control: 'boolean' },
    displayFormat: {
      control: 'select',
      options: ['DD.MM.YYYY', 'YYYY-MM-DD', 'DD/MM/YYYY'],
    },
  },
} satisfies Meta<typeof NDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderTemplate = (args: any) => ({
  components: { NDatePicker },
  setup() {
    const value = ref(args.modelValue);

    watch(
      () => args.modelValue,
      (v) => (value.value = v)
    );
    watch(value, (v) => (args.modelValue = v));

    return { args, value };
  },
  template: `<NDatePicker v-model="value" v-bind="args" />`,
});

export const Default: Story = {
  args: {
    modelValue: null,
    placeholder: 'Выберите дату',
  },
  render: renderTemplate,
};

export const WithLabel: Story = {
  name: 'С лейблом',
  args: {
    modelValue: null,
    label: 'Дата начала',
    placeholder: 'Выберите дату',
  },
  render: renderTemplate,
};

export const WithValue: Story = {
  name: 'С выбранной датой',
  args: {
    modelValue: '2025-06-15',
    label: 'Дата',
  },
  render: renderTemplate,
};

export const Clearable: Story = {
  name: 'С очисткой',
  args: {
    modelValue: '2025-03-20',
    clearable: true,
    label: 'Дата',
  },
  render: renderTemplate,
};

export const WithMinMax: Story = {
  name: 'С ограничениями дат',
  args: {
    modelValue: null,
    label: 'Период',
    minDate: '2025-01-01',
    maxDate: '2025-12-31',
    placeholder: 'Только 2025 год',
  },
  render: renderTemplate,
};

export const Disabled: Story = {
  name: 'Заблокирован',
  args: {
    modelValue: '2025-06-15',
    disabled: true,
    label: 'Дата',
  },
  render: renderTemplate,
};

export const WithError: Story = {
  name: 'С ошибкой',
  args: {
    modelValue: null,
    error: true,
    errorMessage: 'Обязательное поле',
    label: 'Дата отчёта',
  },
  render: renderTemplate,
};

export const FormatYMD: Story = {
  name: 'Формат YYYY-MM-DD',
  args: {
    modelValue: '2025-06-15',
    displayFormat: 'YYYY-MM-DD',
    label: 'ISO формат',
  },
  render: renderTemplate,
};

export const FormatSlash: Story = {
  name: 'Формат DD/MM/YYYY',
  args: {
    modelValue: '2025-06-15',
    displayFormat: 'DD/MM/YYYY',
    label: 'Дата',
  },
  render: renderTemplate,
};
