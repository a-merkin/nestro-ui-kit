import type { Meta, StoryObj } from '@storybook/vue3';
import NFlex from './Flex.vue';
import NBox from '../Box/Box.vue';
import type { FlexAlign, FlexJustify } from './Flex.types';
import type { SpacingToken } from '../Box/Box.types';

const spacingOptions = [
  '0',
  'space-1',
  'space-2',
  'space-3',
  'space-4',
  'space-5',
  'space-6',
  'space-8',
  'space-10',
] satisfies SpacingToken[];

const meta = {
  title: 'Primitives/Flex',
  component: NFlex,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'text',
      description: 'HTML tag (div/section/article...)',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'] satisfies FlexAlign[],
      description: 'align-items',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around'] satisfies FlexJustify[],
      description: 'justify-content',
    },
    gap: {
      control: 'select',
      options: spacingOptions,
      description: 'gap token (spacing.tokens)',
    },
    wrap: {
      control: 'boolean',
      description: 'flex-wrap: wrap',
    },
  },
  args: {
    align: 'center',
    justify: 'between',
    gap: 'space-4',
    wrap: false,
  },
} satisfies Meta<typeof NFlex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NFlex, NBox },
    setup() {
      return { args };
    },
    template: `
      <NFlex v-bind="args">
        <NBox padding="space-3" radius="radius-md" bg="color-blue-60">A</NBox>
        <NBox padding="space-3" radius="radius-md" bg="color-blue-60">B</NBox>
        <NBox padding="space-3" radius="radius-md" bg="color-blue-60">C</NBox>
      </NFlex>
    `,
  }),
};

export const Wrap: Story = {
  args: {
    wrap: true,
    justify: 'start',
    gap: 'space-2',
  },
  render: (args) => ({
    components: { NFlex, NBox },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 260px;">
        <NFlex v-bind="args">
          <NBox padding="space-2" radius="radius-md" bg="color-blue-60">Item 1</NBox>
          <NBox padding="space-2" radius="radius-md" bg="color-blue-60">Item 2</NBox>
          <NBox padding="space-2" radius="radius-md" bg="color-blue-60">Item 3</NBox>
          <NBox padding="space-2" radius="radius-md" bg="color-blue-60">Item 4</NBox>
          <NBox padding="space-2" radius="radius-md" bg="color-blue-60">Item 5</NBox>
        </NFlex>
      </div>
    `,
  }),
};