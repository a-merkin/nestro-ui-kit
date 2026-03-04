import type { Meta, StoryObj } from '@storybook/vue3';
import NText from './Text.vue';
import type { TextAs, TextSize, TextWeight } from './Text.types';
import type { ColorToken } from '../Box/Box.types';

const asOptions = ['span', 'p', 'div', 'label'] satisfies TextAs[];
const sizeOptions = ['xs', 'sm', 'md', 'lg'] satisfies TextSize[];
const weightOptions = ['normal', 'medium', 'bold'] satisfies TextWeight[];

const colorOptions = [
  'color-black',
  'color-grey-80',
  'color-text-disabled',
  'color-text-placeholder',
  'color-text-error',
  'color-green-90',
  'color-blue-60',
] satisfies ColorToken[];

const meta = {
  title: 'Primitives/Text',
  component: NText,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: asOptions,
      description: 'HTML tag',
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'Размер текста (typography.tokens)',
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
    truncate: {
      control: 'boolean',
      description: 'Обрезка в одну строку (ellipsis)',
    },
  },
  args: {
    as: 'span',
    size: 'md',
    weight: 'normal',
    color: 'color-black',
    truncate: false,
  },
} satisfies Meta<typeof NText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NText },
    setup() {
      return { args };
    },
    template: `<NText v-bind="args">Пример текста</NText>`,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { NText },
    template: `
      <div style="display:grid; gap: 8px;">
        <NText size="xs">XS text</NText>
        <NText size="sm">SM text</NText>
        <NText size="md">MD text</NText>
        <NText size="lg">LG text</NText>
      </div>
    `,
  }),
};

export const Truncate: Story = {
  args: { truncate: true },
  render: (args) => ({
    components: { NText },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 220px;">
        <NText v-bind="args">
          Очень длинный текст который должен обрезаться в одну строку
        </NText>
      </div>
    `,
  }),
};