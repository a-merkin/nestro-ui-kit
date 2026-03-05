import type { Meta, StoryObj } from '@storybook/vue3';
import Field from './Field.vue';
import NInput from '../../Input/Input.vue';

const meta = {
  title: 'Primitives/Field',
  component: Field,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label текст' },
    hint: { control: 'text', description: 'Подсказка' },
    error: { control: 'boolean', description: 'Состояние ошибки' },
    errorMessage: { control: 'text', description: 'Текст ошибки' },
    required: { control: 'boolean', description: 'Обязательное поле' },
    disabled: { control: 'boolean', description: 'Отключено' },
  },
  args: {
    label: 'Email',
    hint: 'Введите корпоративный email',
    error: false,
    errorMessage: '',
    required: false,
    disabled: false,
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Field, NInput },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 320px;">
        <Field v-bind="args">
          <NInput model-value="" placeholder="user@company.com" />
        </Field>
      </div>
    `,
  }),
};

export const WithError: Story = {
  render: (args) => ({
    components: { Field, NInput },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 320px;">
        <Field v-bind="args">
          <NInput model-value="" :error="args.error" placeholder="user@company.com" />
        </Field>
      </div>
    `,
  }),
  args: {
    error: true,
    errorMessage: 'Некорректный email',
    hint: '',
  },
};

export const Required: Story = {
  render: (args) => ({
    components: { Field, NInput },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 320px;">
        <Field v-bind="args">
          <NInput model-value="" placeholder="user@company.com" />
        </Field>
      </div>
    `,
  }),
  args: {
    required: true,
  },
};
