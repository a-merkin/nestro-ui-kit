import type { Meta, StoryObj } from '@storybook/vue3';
import Input from '../components/Input/Input.vue';
import Icon from '../components/Icon/Icon.vue';

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Значение поля ввода',
    },
    placeholder: {
      control: 'text',
      description: 'Подсказка в поле ввода',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'date'],
      description: 'Тип поля ввода',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключено ли поле ввода',
    },
    error: {
      control: 'boolean',
      description: 'Наличие ошибки',
    },
    errorMessage: {
      control: 'text',
      description: 'Текст сообщения об ошибке',
    },
    required: {
      control: 'boolean',
      description: 'Обязательно ли поле для заполнения',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: '',
    placeholder: 'Введите текст',
  },
};

export const WithError: Story = {
  args: {
    modelValue: 'Неверный пароль',
    error: true,
    errorMessage: 'Неверный пароль',
  },
};

export const Disabled: Story = {
  args: {
    modelValue: '',
    placeholder: 'Недоступное поле',
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    modelValue: '',
    type: 'password',
    placeholder: 'Введите пароль',
  },
};

export const Required: Story = {
  args: {
    modelValue: '',
    placeholder: 'Обязательное поле',
    required: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    modelValue: '',
    placeholder: 'Поиск...',
  },
  render: (args) => ({
    components: { Input, Icon },
    setup() {
      return { args };
    },
    template: `
      <Input v-bind="args">
        <template #iconLeft>
          <Icon name="magnifier" />
        </template>
      </Input>
    `,
  }),
};

export const WithRightIcon: Story = {
  args: {
    modelValue: '',
    placeholder: 'Настройки...',
  },
  render: (args) => ({
    components: { Input, Icon },
    setup() {
      return { args };
    },
    template: `
      <Input v-bind="args">
        <template #iconRight>
          <Icon name="settings" />
        </template>
      </Input>
    `,
  }),
};

export const WithBothIcons: Story = {
  args: {
    modelValue: '',
    placeholder: 'Поиск настроек...',
  },
  render: (args) => ({
    components: { Input, Icon },
    setup() {
      return { args };
    },
    template: `
      <Input v-bind="args">
        <template #iconLeft>
          <Icon name="magnifier" />
        </template>
        <template #iconRight>
          <Icon name="settings" />
        </template>
      </Input>
    `,
  }),
};

export const WithIconsAndError: Story = {
  args: {
    modelValue: 'Неверный запрос',
    placeholder: 'Поиск...',
    error: true,
    errorMessage: 'Не удалось найти результаты',
  },
  render: (args) => ({
    components: { Input, Icon },
    setup() {
      return { args };
    },
    template: `
      <Input v-bind="args">
        <template #iconLeft>
          <Icon name="magnifier" />
        </template>
      </Input>
    `,
  }),
};

export const DateInput: Story = {
  args: {
    modelValue: '',
    type: 'date',
    placeholder: 'Выберите дату',
  },
};
