import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Modal from './Modal.vue';
import { Button } from '../Button';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: 'boolean' },
    loading: { control: 'boolean' },
    teleport: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: false,
  },
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <Button @click="open = true">Открыть модалку</Button>
      <Modal v-model="open" v-bind="args">
        <template #title>Заголовок</template>
        Контент модального окна.
        <template #actions>
          <Button variant="secondary" @click="open = false">Отмена</Button>
          <Button @click="open = false">Ок</Button>
        </template>
      </Modal>
    `,
  }),
};

export const WithLoading: Story = {
  args: {
    modelValue: true,
    loading: true,
  },
  render: (args) => ({
    components: { Modal },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #title>Сохранение</template>
        Пожалуйста, подождите...
      </Modal>
    `,
  }),
};

export const NoBackdropClose: Story = {
  args: {
    modelValue: true,
    closeOnBackdrop: false,
  },
  render: (args) => ({
    components: { Modal },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #title>Важно</template>
        Нельзя закрыть кликом по фону.
      </Modal>
    `,
  }),
};
