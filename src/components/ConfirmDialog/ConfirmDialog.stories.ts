import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NConfirmDialog from './ConfirmDialog.vue';
import NButton from '../Button/Button.vue';

const meta = {
  title: 'UI/ConfirmDialog',
  component: NConfirmDialog,
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean', description: 'Видимость диалога' },
    title: { control: 'text', description: 'Заголовок' },
    description: { control: 'text', description: 'Описание' },
    confirmText: { control: 'text', description: 'Текст кнопки подтверждения' },
    cancelText: { control: 'text', description: 'Текст кнопки отмены' },
    variant: {
      control: 'select',
      options: ['default', 'danger'],
      description: 'Вариант: default или danger',
    },
    loading: { control: 'boolean', description: 'Состояние загрузки' },
    disabled: { control: 'boolean', description: 'Заблокировать подтверждение' },
    closeOnOverlay: { control: 'boolean', description: 'Закрытие по overlay' },
    closeOnEsc: { control: 'boolean', description: 'Закрытие по Esc' },
  },
} satisfies Meta<typeof NConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'По умолчанию',
  args: {
    open: false,
    title: 'Подтверждение действия',
    description: 'Вы уверены, что хотите выполнить это действие? Отменить его будет невозможно.',
    confirmText: 'Подтвердить',
    cancelText: 'Отмена',
    variant: 'default',
  },
  render: (args) => ({
    components: { NConfirmDialog, NButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <NButton @click="open = true">Открыть диалог</NButton>
        <NConfirmDialog
          v-bind="args"
          :open="open"
          @update:open="open = $event"
          @confirm="open = false"
          @cancel="open = false"
        />
      </div>
    `,
  }),
};

export const Danger: Story = {
  name: 'Danger вариант',
  args: {
    open: false,
    title: 'Удалить запись?',
    description: 'Это действие необратимо. Все связанные данные будут удалены безвозвратно.',
    confirmText: 'Удалить',
    cancelText: 'Отмена',
    variant: 'danger',
  },
  render: (args) => ({
    components: { NConfirmDialog, NButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <NButton @click="open = true">Удалить</NButton>
        <NConfirmDialog
          v-bind="args"
          :open="open"
          @update:open="open = $event"
          @confirm="open = false"
          @cancel="open = false"
        />
      </div>
    `,
  }),
};

export const WithLoading: Story = {
  name: 'С загрузкой',
  args: {
    open: false,
    title: 'Сохранение данных',
    description: 'Подтвердите сохранение изменений.',
    confirmText: 'Сохранить',
    cancelText: 'Отмена',
  },
  render: (args) => ({
    components: { NConfirmDialog, NButton },
    setup() {
      const open = ref(false);
      const loading = ref(false);
      const handleConfirm = () => {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          open.value = false;
        }, 2000);
      };
      return { args, open, loading, handleConfirm };
    },
    template: `
      <div>
        <NButton @click="open = true">Сохранить</NButton>
        <NConfirmDialog
          v-bind="args"
          :open="open"
          :loading="loading"
          @update:open="open = $event"
          @confirm="handleConfirm"
          @cancel="open = false"
        />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Заблокировано',
  args: {
    open: false,
    title: 'Подтверждение',
    description: 'Кнопка подтверждения заблокирована.',
    confirmText: 'Подтвердить',
    cancelText: 'Отмена',
    disabled: true,
  },
  render: (args) => ({
    components: { NConfirmDialog, NButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <NButton @click="open = true">Открыть</NButton>
        <NConfirmDialog
          v-bind="args"
          :open="open"
          @update:open="open = $event"
          @cancel="open = false"
        />
      </div>
    `,
  }),
};

export const CustomContent: Story = {
  name: 'Кастомный контент',
  args: {
    open: false,
    title: 'Экспорт данных',
    confirmText: 'Экспорт',
    cancelText: 'Назад',
  },
  render: (args) => ({
    components: { NConfirmDialog, NButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <NButton @click="open = true">Экспорт</NButton>
        <NConfirmDialog
          v-bind="args"
          :open="open"
          @update:open="open = $event"
          @confirm="open = false"
          @cancel="open = false"
        >
          <div style="margin-bottom: 8px; font-size: 14px; color: #464E56;">
            <p style="margin: 0 0 12px;">Будут экспортированы следующие данные:</p>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
              <li>Таблица замеров (1 248 записей)</li>
              <li>Графики динамики (12 шт.)</li>
              <li>Сводный отчёт</li>
            </ul>
          </div>
        </NConfirmDialog>
      </div>
    `,
  }),
};

export const NoOverlayClose: Story = {
  name: 'Без закрытия по overlay',
  args: {
    open: false,
    title: 'Важное подтверждение',
    description: 'Этот диалог можно закрыть только кнопками.',
    confirmText: 'Принять',
    cancelText: 'Отклонить',
    closeOnOverlay: false,
    closeOnEsc: false,
  },
  render: (args) => ({
    components: { NConfirmDialog, NButton },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div>
        <NButton @click="open = true">Открыть</NButton>
        <NConfirmDialog
          v-bind="args"
          :open="open"
          @update:open="open = $event"
          @confirm="open = false"
          @cancel="open = false"
        />
      </div>
    `,
  }),
};
