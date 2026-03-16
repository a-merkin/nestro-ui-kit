import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import FileUpload from './FileUpload.vue';
import type { FileUploadFileLike, FileUploadVariant } from './FileUpload.types';

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
    showFooter: {
      control: 'boolean',
      description: 'Показывать футер с кнопками Отмена / Добавить файлы',
    },
    showHint: {
      control: 'boolean',
      description: 'Показывать подсказку (accept/maxFileSize/fileLimit) в dropzone',
    },
  },
  args: {
    variant: 'primary',
    disabled: false,
    loading: false,
    multiple: true,
    accept: 'image/*,.pdf,.doc,.docx',
    maxFileSize: 5 * 1024 * 1024,
    fileLimit: 5,
    dragDrop: true,
    showHint: true,
    showFooter: true,
    onSelect: fn(),
    onRemove: fn(),
    onCancel: fn(),
    onAdd: fn(),
    'onUpdate:modelValue': fn(),
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFiles: Story = {
  args: {
    modelValue: [
      {
        __key: '1',
        name: 'report-q4.doc',
        size: 124 * 1024,
        type: 'application/msword',
        lastModified: Date.now(),
        file: new File([], 'report-q4.doc'),
        status: 'done',
      },
      {
        __key: '2',
        name: 'presentation.pdf',
        size: 2.3 * 1024 * 1024,
        type: 'application/pdf',
        lastModified: Date.now(),
        file: new File([], 'presentation.pdf'),
        status: 'uploading',
        progress: 88,
      },
      {
        __key: '3',
        name: 'image-photo.png',
        size: 512 * 1024,
        type: 'image/png',
        lastModified: Date.now(),
        file: new File([], 'image-photo.png'),
        status: 'uploading',
        progress: 42,
      },
    ] as FileUploadFileLike[],
  },
};

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
  },
};

export const WithoutFooter: Story = {
  args: {
    showFooter: false,
  },
};

export const StrictLimits: Story = {
  args: {
    accept: '.png,.jpg',
    maxFileSize: 300 * 1024,
    fileLimit: 2,
  },
};
