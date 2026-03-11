import type { Meta, StoryObj } from '@storybook/vue3';
import NStack from './Stack.vue';
import NBox from '../Box/Box.vue';
import type { SpacingToken } from '../Box/Box.types';
import type { FlexAlign, FlexJustify } from '../Flex/Flex.types';

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
  title: 'Primitives/Stack',
  component: NStack,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'text',
      description: 'HTML tag (div/section/article...)',
    },
    gap: {
      control: 'select',
      options: spacingOptions,
      description: 'Gap token (spacing.tokens)',
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
  },
  args: {
    gap: 'space-3',
    align: 'stretch',
    justify: 'start',
  },
} satisfies Meta<typeof NStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NStack, NBox },
    setup() {
      return { args };
    },
    template: `
      <NStack v-bind="args">
        <NBox padding="space-3" radius="radius-md" bg="color-bg-secondary">Item 1</NBox>
        <NBox padding="space-3" radius="radius-md" bg="color-bg-secondary">Item 2</NBox>
        <NBox padding="space-3" radius="radius-md" bg="color-bg-secondary">Item 3</NBox>
      </NStack>
    `,
  }),
};

export const Centered: Story = {
  args: {
    align: 'center',
    gap: 'space-2',
  },
  render: (args) => ({
    components: { NStack, NBox },
    setup() {
      return { args };
    },
    template: `
      <NStack v-bind="args">
        <NBox padding="space-2" radius="radius-md" bg="color-blue-60">A</NBox>
        <NBox padding="space-2" radius="radius-md" bg="color-blue-60">B</NBox>
        <NBox padding="space-2" radius="radius-md" bg="color-blue-60">C</NBox>
      </NStack>
    `,
  }),
};
