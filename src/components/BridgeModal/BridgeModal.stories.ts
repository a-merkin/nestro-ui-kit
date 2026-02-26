import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import BridgeModal from './BridgeModal.vue';

const meta = {
  title: 'UI/BridgeModal',
  component: BridgeModal,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
  },
} satisfies Meta<typeof BridgeModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
  },
  render: (args) => ({
    components: { BridgeModal },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <BridgeModal v-model="open" v-bind="args" />
    `,
  }),
};
