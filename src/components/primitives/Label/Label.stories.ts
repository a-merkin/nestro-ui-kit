import type { Meta, StoryObj } from '@storybook/vue3';
import NLabel from './Label.vue';
import type { LabelSize, LabelWeight } from './Label.types';
import type { ColorToken } from '../Box/Box.types';

const sizeOptions = ['xs', 'sm', 'md'] satisfies LabelSize[];
const weightOptions = ['normal', 'medium', 'bold'] satisfies LabelWeight[];

const colorOptions = [
  'color-grey-80',
  'color-black',
  'color-green-90',
  'color-blue-60',
  'color-text-error',
  'color-text-disabled',
] satisfies ColorToken[];

const meta = {
  title: 'Primitives/Label',
  component: NLabel,
  tags: ['autodocs'],
  argTypes: {
    forId: {
      control: 'text',
      description: 'Связать label с input (for)',
    },
    required: {
      control: 'boolean',
      description: 'Показывать звёздочку *',
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'Размер (typography.tokens)',
    },
    weight: {
      control: 'select',
      options: weightOptions,
      description: 'Толщина (font-weight tokens)',
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'Цвет (colors.tokens)',
    },
  },
  args: {
    forId: 'input-id',
    required: false,
    size: 'xs',
    weight: 'medium',
    color: 'color-grey-80',
  },
} satisfies Meta<typeof NLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NLabel },
    setup() {
      return { args };
    },
    template: `<NLabel v-bind="args">Лейбл</NLabel>`,
  }),
};

export const Required: Story = {
  args: { required: true },
  render: (args) => ({
    components: { NLabel },
    setup() {
      return { args };
    },
    template: `<NLabel v-bind="args">Обязательное поле</NLabel>`,
  }),
};

export const WithInputExample: Story = {
  render: () => ({
    components: { NLabel },
    template: `
      <div style="display:grid; gap: 8px; max-width: 320px;">
        <NLabel forId="email" required>Email</NLabel>
        <input id="email" placeholder="user@mail.com" style="height: 36px; padding: 0 12px; border: 1px solid #ddd; border-radius: 12px;" />
      </div>
    `,
  }),
};
