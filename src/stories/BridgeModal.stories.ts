import type { Meta, StoryObj } from '@storybook/vue3';
import BridgeModal from '../components/BridgeModal/BridgeModal.vue';
import { ref } from 'vue';

const meta: Meta<typeof BridgeModal> = {
  title: 'System/BridgeModal',
  component: BridgeModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    channelName: {
      control: 'text',
      description: 'Имя BroadcastChannel для общения между окнами',
    },
    autoCloseOnEvent: {
      control: 'text',
      description: 'Тип события, при котором окно закроется автоматически',
    },
    debug: {
      control: 'boolean',
      description: 'Включает логирование сообщений в консоль',
    },
    default: {
      description: 'Основной слот с контентом модального окна',
    },
    header: {
      description: 'Слот заголовка модального окна',
    },
    footer: {
      description: 'Слот футера модального окна (например, кнопки действий)',
    },
  },
  args: {
    debug: true,
    channelName: 'storybook-bridge-demo',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { BridgeModal },
    setup() {
      const demoData = ref({ user: 'Andrey', project: 'UI Kit' });
      const postMessage = () => {
        const channelName = args.channelName ?? 'storybook-bridge-demo';
        const channel = new BroadcastChannel(channelName);

        channel.postMessage({ type: 'init', payload: demoData.value });
        channel.postMessage({
          type: 'event',
          payload: { type: 'custom-event', message: 'Hello from parent!' },
        });
      };

      return { args, demoData, postMessage };
    },
    template: `
      <BridgeModal v-bind="args">
        <template #header>
          <h3>Bridge Modal Demo</h3>
        </template>

        <template #default="{ initData, postEvent, close }">
          <p>Init data: {{ initData }}</p>
          <button @click="postEvent('event', { type: 'clicked', time: new Date().toISOString() })">Отправить событие</button>
          <button @click="close()">Закрыть</button>
        </template>

        <template #footer>
          <button @click="postMessage()">Симулировать init + event</button>
        </template>
      </BridgeModal>
    `,
  }),
};
