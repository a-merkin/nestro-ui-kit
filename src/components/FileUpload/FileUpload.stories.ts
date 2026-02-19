import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';
import FileUpload from './FileUpload.vue';
import type { FileUploadMode, FileUploadVariant } from './FileUpload.types';

const meta = {
  title: 'UI/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['basic', 'advanced'] satisfies FileUploadMode[],
      description: 'Режим компонента',
    },
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
    auto: {
      control: 'boolean',
      description: 'Автоматически вызывать upload после выбора файлов',
    },
    dragDrop: {
      control: 'boolean',
      description: 'Разрешить drag&drop (в advanced)',
    },

    chooseLabel: {
      control: 'text',
      description: 'Текст кнопки выбора',
    },
    uploadLabel: {
      control: 'text',
      description: 'Текст кнопки загрузки',
    },
    clearLabel: {
      control: 'text',
      description: 'Текст кнопки очистки',
    },
    dropzoneLabel: {
      control: 'text',
      description: 'Текст dropzone (в advanced)',
    },
    emptyLabel: {
      control: 'text',
      description: 'Текст при пустом списке (в advanced)',
    },
    showHint: {
      control: 'boolean',
      description: 'Показывать подсказку (accept/maxFileSize/fileLimit)',
    },

    hint: {
      control: 'text',
      description: 'Слот подсказки (hint)',
    },
    dropzone: {
      control: 'text',
      description: 'Слот зоны перетаскивания (dropzone)',
    },
    empty: {
      control: 'text',
      description: 'Слот пустого состояния (empty)',
    },
    'icon-left': {
      control: 'text',
      description: 'Слот для иконки слева (basic)',
    },
    'icon-right': {
      control: 'text',
      description: 'Слот для иконки справа (basic)',
    },
  },
  args: {
    mode: 'advanced',
    variant: 'primary',
    disabled: false,
    loading: false,
    multiple: true,
    accept: 'image/*,.pdf',
    maxFileSize: 2 * 1024 * 1024,
    fileLimit: 5,
    auto: false,
    dragDrop: true,
    showHint: true,
    chooseLabel: 'Choose',
    uploadLabel: 'Upload',
    clearLabel: 'Clear',
    dropzoneLabel: 'Drag and drop files or click',
    emptyLabel: 'No files selected',

    onSelect: fn(),
    onUpload: fn(),
    onRemove: fn(),
    onClear: fn(),
    'onUpdate:modelValue': fn(),
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Advanced: Story = {
  args: {
    mode: 'advanced',
  },
};

export const Basic: Story = {
  args: {
    mode: 'basic',
    multiple: false,
    dragDrop: false,
    chooseLabel: 'Select file',
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

export const AutoUpload: Story = {
  args: {
    auto: true,
  },
};

export const WithHintSlot: Story = {
  render: (args) => ({
    components: { FileUpload },
    setup() {
      return { args };
    },
    template: `
      <FileUpload v-bind="args">
        <template #hint>
          <span>Можно загрузить до 5 файлов, не больше 2MB каждый.</span>
        </template>
      </FileUpload>
    `,
  }),
};

export const WithDropzoneSlot: Story = {
  args: {
    mode: 'advanced',
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

export const WithEmptySlot: Story = {
  args: {
    mode: 'advanced',
  },
  render: (args) => ({
    components: { FileUpload },
    setup() {
      return { args };
    },
    template: `
      <FileUpload v-bind="args">
        <template #empty>
          <span style="opacity:.7;">Пока файлов нет — выберите или перетащите.</span>
        </template>
      </FileUpload>
    `,
  }),
};

export const BasicWithIcons: Story = {
  args: {
    mode: 'basic',
    multiple: false,
    dragDrop: false,
  },
  render: (args) => ({
    components: { FileUpload },
    setup() {
      return { args };
    },
    template: `
      <FileUpload v-bind="args">
        <template #icon-left>📁</template>
        <template #icon-right>➕</template>
      </FileUpload>
    `,
  }),
};