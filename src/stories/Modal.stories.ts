import { ref } from 'vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import Modal from '../components/Modal/Modal.vue';
import Button from '../components/Button/Button.vue';
import Loader from '../components/Loader/Loader.vue';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Управляет видимостью модального окна',
    },
    loading: {
      control: 'boolean',
      description: 'Показывает состояние загрузки',
    },
  },
  args: {
    modelValue: false,
    loading: false,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/* 📘 Базовая документационная история */
export const Docs: Story = {
  render: (args) => ({
    components: { Modal },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <p>Это пример модального окна для документации. Оно не открыто по умолчанию.</p>
      </Modal>
    `,
  }),
};

/* ⚙️ Простое модальное окно */
export const Default: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const open = ref(true);
      return { args, open };
    },
    template: `
      <Modal v-model="open">
        <p>Это простое модальное окно без заголовка и футера.</p>
      </Modal>
    `,
  }),
};

/* 🎛 Интерактивная модалка */
export const Interactive: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div style="padding: 20px;">
        <Button variant="primary" @click="open = true">Открыть модалку</Button>

        <Modal v-model="open">
          <p>Интерактивная модалка. Её можно закрыть кликом вне области или по Escape.</p>
          <template #actions>
            <Button variant="secondary" @click="open = false">Закрыть</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
};

/* 🧩 Модалка с заголовком и действиями */
export const WithHeaderAndActions: Story = {
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(true);
      return { open };
    },
    template: `
      <Modal v-model="open">
        <template #title>Заголовок модалки</template>

        <p>Модалка с заголовком, текстом и кнопками действий.</p>

        <template #actions>
          <Button variant="secondary" @click="open = false">Отмена</Button>
          <Button variant="primary">Сохранить</Button>
        </template>
      </Modal>
    `,
  }),
};

/* ⏳ Состояние загрузки */
export const Loading: Story = {
  render: () => ({
    components: { Modal, Button, Loader },
    setup() {
      const open = ref(true);
      const loading = ref(true);

      // Эмуляция загрузки
      setTimeout(() => (loading.value = false), 2500);

      return { open, loading };
    },
    template: `
      <Modal v-model="open" :loading="loading">
        <template #title>Загрузка данных</template>

        <p v-if="!loading">Данные успешно загружены!</p>

        <template #actions>
          <Button variant="secondary" @click="open = false">Закрыть</Button>
        </template>
      </Modal>
    `,
  }),
};
