import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Textarea from './Textarea.vue';
import type { TextareaResize, TextareaVariant } from './Textarea.types';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'] satisfies TextareaVariant[],
      description: 'Вариант оформления',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключено ли поле',
    },
    readonly: {
      control: 'boolean',
      description: 'Только для чтения',
    },
    invalid: {
      control: 'boolean',
      description: 'Состояние ошибки (красная рамка)',
    },
    rows: {
      control: 'number',
      description: 'Количество строк',
    },
    cols: {
      control: 'number',
      description: 'Количество колонок (редко нужно)',
    },
    maxlength: {
      control: 'number',
      description: 'Максимальное количество символов',
    },
    placeholder: {
      control: 'text',
      description: 'Плейсхолдер',
    },
    label: {
      control: 'text',
      description: 'Текст лейбла (props) / слот label',
    },
    hint: {
      control: 'text',
      description: 'Подсказка (props) / слот hint',
    },
    error: {
      control: 'text',
      description: 'Текст ошибки (props) / слот error',
    },
    autofocus: {
      control: 'boolean',
      description: 'Автофокус',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'] satisfies TextareaResize[],
      description: 'Разрешение изменения размера',
    },
    showCount: {
      control: 'boolean',
      description: 'Показывать счётчик символов (работает с maxlength)',
    },
    id: {
      control: 'text',
      description: 'id (для связки aria-describedby)',
    },
    name: {
      control: 'text',
      description: 'name',
    },
  },
  args: {
    'onUpdate:modelValue': fn(),
    onInput: fn(),
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),

    variant: 'default',
    disabled: false,
    readonly: false,
    invalid: false,
    rows: 4,
    placeholder: 'Введите текст...',
    label: 'Комментарий',
    hint: 'Опишите задачу подробнее',
    error: 'Поле заполнено неверно',
    resize: 'vertical',
    showCount: false,
    maxlength: undefined,
    id: 'textarea',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    label: 'Комментарий',
    hint: 'Опишите задачу подробнее',
    invalid: false,
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
};

export const WithLabelSlot: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 520px;">
        <Textarea v-bind="args" label="">
          <template #label>
            <span style="display:inline-flex; gap:6px; align-items:center;">
              <span style="font-weight:600;">Описание</span>
              <span style="opacity:.6; font-size:12px;">(slot)</span>
            </span>
          </template>
        </Textarea>
      </div>
    `,
  }),
};

export const WithHintSlot: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 520px;">
        <Textarea v-bind="args" hint="">
          <template #hint>
            <span>Подсказка из слота: можно писать в свободной форме.</span>
          </template>
        </Textarea>
      </div>
    `,
  }),
};

export const Invalid: Story = {
  args: {
    invalid: true,
    error: 'Обязательное поле',
    hint: '',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    hint: 'Поле отключено',
  },
};

export const Readonly: Story = {
  args: {
    readonly: true,
    hint: 'Только чтение',
  },
};

export const WithCounter: Story = {
  args: {
    maxlength: 200,
    showCount: true,
    hint: 'Максимум 200 символов',
  },
};

export const ResizeNone: Story = {
  args: {
    resize: 'none',
    hint: 'resize: none',
  },
};

export const ResizeBoth: Story = {
  args: {
    resize: 'both',
    hint: 'resize: both',
  },
};