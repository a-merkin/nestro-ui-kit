import type { Meta, StoryObj } from '@storybook/vue3';
import NBox from './Box.vue';
import type { ColorToken, RadiusToken, SpacingToken } from './Box.types';

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

const radiusOptions = [
  'radius-sm',
  'radius-md',
  'radius-lg',
  'radius-xl',
  'radius-round',
  'radius-toggle-sm',
  'radius-toggle-md',
  'radius-toggle-lg',
] satisfies RadiusToken[];

const colorOptions = [
  'color-white',
  'color-black',
  'color-grey-20',
  'color-grey-40',
  'color-blue-30',
  'color-green-90',
  'color-bg-primary',
  'color-bg-secondary',
  'color-bg-overlay-white-1',
  'color-bg-overlay-green',
] satisfies ColorToken[];

const meta = {
  title: 'Primitives/Box',
  component: NBox,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'text',
      description: 'HTML tag (div/section/article...)',
    },
    padding: {
      control: 'select',
      options: spacingOptions,
      description: 'Padding token (spacing.tokens)',
    },
    margin: {
      control: 'select',
      options: spacingOptions,
      description: 'Margin token (spacing.tokens)',
    },
    radius: {
      control: 'select',
      options: radiusOptions,
      description: 'Radius token (radius.tokens)',
    },
    bg: {
      control: 'select',
      options: colorOptions,
      description: 'Background color token (colors.tokens)',
    },
  },
  args: {
    as: 'div',
    padding: 'space-4',
    radius: 'radius-xl',
    bg: 'color-bg-secondary',
  },
} satisfies Meta<typeof NBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NBox },
    setup() {
      return { args };
    },
    template: `
      <NBox v-bind="args">
        <div>Box content</div>
      </NBox>
    `,
  }),
};

export const WithMargin: Story = {
  args: { margin: 'space-6' },
  render: (args) => ({
    components: { NBox },
    setup() {
      return { args };
    },
    template: `
      <div style="background:#f5f5f5; padding: 16px;">
        <NBox v-bind="args">
          <div>Margin applied</div>
        </NBox>
      </div>
    `,
  }),
};

export const AsSection: Story = {
  args: { as: 'section' },
};