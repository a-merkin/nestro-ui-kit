import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import FileUpload from './FileUpload.vue';
import type { FileUploadVariant } from './FileUpload.types';

const meta = {
  title: 'UI/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'] satisfies FileUploadVariant[],
      description: 'Вариант оформления',
    },
    disabled: {
      control: 'boolean',
      description: 'Отключен ли компонент',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки (блокирует действия)',
    },
    multiple: {
      control: 'boolean',
      description: 'Разрешить выбор нескольких файлов',
    },
    accept: {
      control: 'text',
      description: 'Ограничение типов файлов (например: image/*,.pdf)',
    },
    maxFileSize: {
      control: 'number',
      description: 'Максимальный размер файла (в байтах)',
    },
    fileLimit: {
      control: 'number',
      description: 'Максимальное количество файлов',
    },
    dragDrop: {
      control: 'boolean',
      description: 'Показывать dropzone (если false — будет кнопка)',
    },
    chooseLabel: {
      control: 'text',
      description: 'Текст кнопки (когда dragDrop=false)',
    },
    dropzoneLabel: {
      control: 'text',
      description: 'Текст dropzone',
    },
    showHint: {
      control: 'boolean',
      description: 'Показывать подсказку (accept/maxFileSize/fileLimit) в dropzone',
    },

    dropzone: {
      control: 'text',
      description: 'Слот зоны перетаскивания (dropzone)',
    },
  },
  args: {
    variant: 'primary',
    disabled: false,
    loading: false,
    multiple: true,
    accept: 'image/*,.pdf',
    maxFileSize: 2 * 1024 * 1024,
    fileLimit: 5,
    dragDrop: true,
    showHint: true,
    chooseLabel: 'Choose file',
    dropzoneLabel: 'Drag and drop files or click',

    onSelect: fn(),
    'onUpdate:modelValue': fn(),
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithoutDropzone: Story = {
  args: {
    dragDrop: false,
    chooseLabel: 'Select file',
  },
};

export const WithDropzoneSlot: Story = {
  args: {
    dragDrop: true,
  },
  render: (args) => ({
    components: { FileUpload },
    setup() {
      return { args };
    },
    template: `
      <FileUpload v-bind="args">
        <template #dropzone>
          <div style="display:grid; gap: 6px;">
            <div style="font-weight: 600;">📎 Перетащите файлы сюда</div>
            <div style="opacity:.7; font-size: 12px;">или нажмите, чтобы выбрать</div>
          </div>
        </template>
      </FileUpload>
    `,
  }),
};

export const StrictLimits: Story = {
  args: {
    accept: '.png,.jpg',
    maxFileSize: 300 * 1024,
    fileLimit: 2,
    dropzoneLabel: 'Only PNG/JPG, up to 300KB (max 2 files)',
  },
};