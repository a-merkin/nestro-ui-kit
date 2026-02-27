import type { Meta, StoryObj } from '@storybook/vue3';
import BridgeModal from './BridgeModal.vue';

const meta = {
  title: 'UI/BridgeModal',
  component: BridgeModal,
  tags: ['autodocs'],
  argTypes: {
    channelName: { control: 'text' },
    autoCloseOnEvent: { control: 'text' },
    debug: { control: 'boolean' },
  },
} satisfies Meta<typeof BridgeModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    channelName: 'nestro-bridge-channel',
    debug: false,
  },
  render: (args) => ({
    components: { BridgeModal },
    setup() {
      return { args };
    },
    template: `
      <BridgeModal v-bind="args">
        <template #header>
          <h2>Bridge Modal</h2>
        </template>

        <template #default="{ initData, postEvent, close }">
          <p>Init data: {{ initData ?? 'Waiting for init message...' }}</p>
          <button @click="postEvent('save', { value: 42 })">Send save event</button>
          <button @click="close()">Close</button>
        </template>

        <template #footer>
          <span>Footer slot</span>
        </template>
      </BridgeModal>
    `,
  }),
};
