import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import Notification from './Notification.vue';
import type { NotificationPosition, NotificationType } from './Notification.types';

const meta = {
  title: 'UI/Notification',
  component: Notification,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    visible: {
      control: 'boolean',
      description: 'Показывать уведомление',
    },
    type: {
      control: 'select',
      options: ['info', 'success', 'warn', 'error'] satisfies NotificationType[],
      description: 'Тип уведомления',
    },
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
      ] satisfies NotificationPosition[],
      description: 'Позиция на экране',
    },
    title: {
      control: 'text',
      description: 'Заголовок (props) / слот title',
    },
    message: {
      control: 'text',
      description: 'Текст сообщения (props) / default slot',
    },
    closable: {
      control: 'boolean',
      description: 'Показывать кнопку закрытия',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключить взаимодействие',
    },
    duration: {
      control: 'number',
      description: 'Автозакрытие в мс (0 — выключено)',
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Пауза автозакрытия при наведении',
    },
    icon: {
      control: 'text',
      description: 'Иконка уведомления (slot)',
    },
  },
  args: {
    visible: true,
    type: 'info',
    position: 'top-right',
    title: 'Уведомление',
    message: 'Текст уведомления',
    closable: true,
    disabled: false,
    duration: 0,
    pauseOnHover: true,

    'onUpdate:visible': fn(),
    onClose: fn(),
    onClick: fn(),
    onPause: fn(),
    onResume: fn(),
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TopRight: Story = {
  args: {
    position: 'top-right',
    title: 'Top Right',
    message: 'position: top-right',
  },
};

export const TopLeft: Story = {
  args: {
    position: 'top-left',
    title: 'Top Left',
    message: 'position: top-left',
  },
};

export const BottomRight: Story = {
  args: {
    position: 'bottom-right',
    title: 'Bottom Right',
    message: 'position: bottom-right',
  },
};

export const BottomLeft: Story = {
  args: {
    position: 'bottom-left',
    title: 'Bottom Left',
    message: 'position: bottom-left',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    position: 'top-right',
    title: 'Инфо',
    message: 'Это информационное уведомление',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    position: 'top-left',
    title: 'Успех',
    message: 'Операция выполнена успешно',
  },
};

export const Warn: Story = {
  args: {
    type: 'warn',
    position: 'bottom-right',
    title: 'Предупреждение',
    message: 'Проверьте введённые данные',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    position: 'bottom-left',
    title: 'Ошибка',
    message: 'Что-то пошло не так',
  },
};

export const NoAutoClose: Story = {
  args: {
    duration: 100,
    position: 'top-right',
    title: 'Без автозакрытия',
    message: 'Закрывается только вручную',
  },
};

export const NotClosable: Story = {
  args: {
    closable: false,
    duration: 100,
    position: 'top-left',
    title: 'Без крестика',
    message: 'Нельзя закрыть кнопкой',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    position: 'bottom-right',
    title: 'Disabled',
    message: 'Взаимодействие отключено',
  },
};

export const WithSlots: Story = {
  render: (args) => ({
    components: { Notification },
    setup() {
      return { args };
    },
    template: `
      <Notification v-bind="args" title="" message="">
        <template #title>
          <span style="display:inline-flex; gap: 6px; align-items:center;">
            <b>Слот заголовка</b>
            <span style="opacity:.6; font-size:12px;">(slot)</span>
          </span>
        </template>

        <div style="display:grid; gap: 6px;">
          <div>Сообщение через default slot.</div>
          <div style="opacity:.7; font-size: 12px;">Можно вставлять любой контент.</div>
        </div>
      </Notification>
    `,
  }),
  args: {
    type: 'success',
    position: 'bottom-left',
    duration: 100,
  },
};
