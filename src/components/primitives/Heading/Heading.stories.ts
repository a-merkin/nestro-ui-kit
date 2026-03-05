import type { Meta, StoryObj } from '@storybook/vue3';
import NHeading from './Heading.vue';
import type { HeadingLevel, HeadingSize, HeadingWeight } from './Heading.types';
import type { ColorToken } from '../Box/Box.types';

const levelOptions = [1, 2, 3, 4, 5, 6] satisfies HeadingLevel[];
const sizeOptions = ['xs', 'sm', 'md', 'lg'] satisfies HeadingSize[];
const weightOptions = ['normal', 'medium', 'bold'] satisfies HeadingWeight[];

const colorOptions = [
  'color-black',
  'color-grey-80',
  'color-green-90',
  'color-blue-60',
  'color-text-disabled',
  'color-text-error',
] satisfies ColorToken[];

const meta = {
  title: 'Primitives/Heading',
  component: NHeading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: levelOptions,
      description: 'Heading level (h1..h6)',
    },
    size: {
      control: 'select',
      options: sizeOptions,
      description: 'Typography size preset',
    },
    weight: {
      control: 'select',
      options: weightOptions,
      description: 'Font weight preset',
    },
    color: {
      control: 'select',
      options: colorOptions,
      description: 'Color token (colors.tokens)',
    },
    truncate: {
      control: 'boolean',
      description: 'Single-line truncate',
    },
  },
  args: {
    level: 2,
    size: 'lg',
    weight: 'bold',
    color: 'color-black',
    truncate: false,
  },
} satisfies Meta<typeof NHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NHeading },
    setup() {
      return { args };
    },
    template: `<NHeading v-bind="args">Заголовок</NHeading>`,
  }),
};

export const Levels: Story = {
  render: () => ({
    components: { NHeading },
    template: `
      <div style="display:grid; gap: 12px;">
        <NHeading :level="1" size="lg">H1 Heading</NHeading>
        <NHeading :level="2" size="lg">H2 Heading</NHeading>
        <NHeading :level="3" size="md">H3 Heading</NHeading>
        <NHeading :level="4" size="md">H4 Heading</NHeading>
        <NHeading :level="5" size="sm">H5 Heading</NHeading>
        <NHeading :level="6" size="sm">H6 Heading</NHeading>
      </div>
    `,
  }),
};

export const Truncate: Story = {
  args: { truncate: true },
  render: (args) => ({
    components: { NHeading },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 260px;">
        <NHeading v-bind="args">
          Очень длинный заголовок который должен обрезаться в одну строку
        </NHeading>
      </div>
    `,
  }),
};