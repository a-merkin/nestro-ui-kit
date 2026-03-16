<template>
  <div :class="rootClasses">
    <input
      ref="inputRef"
      class="file-upload__input"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled || loading"
      @change="onInputChange"
    />

    <!-- Dropzone -->
    <div
      v-if="dragDrop"
      class="file-upload__dropzone"
      :class="{ 'file-upload__dropzone--active': isDragActive }"
      @dragenter.prevent="onDragEnter"
      @dragover.prevent
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
      @click="openDialog"
    >
      <div class="file-upload__dropzone-inner">
        <slot name="dropzone">
          <Icon name="upload" size="lg" color="green-90" class="file-upload__dropzone-icon" />

          <div class="file-upload__dropzone-title">
            Перетащите файлы или
            <span class="file-upload__dropzone-browse" @click.stop="openDialog"> выберите </span>
          </div>

          <div v-if="showHint && hintText" class="file-upload__dropzone-subtitle">
            {{ hintText }}
          </div>
        </slot>
      </div>
    </div>

    <!-- Button fallback (no drag-drop) -->
    <div v-else>
      <button
        type="button"
        class="file-upload__choose"
        :disabled="disabled || loading"
        @click="openDialog"
      >
        Выбрать файл
      </button>
    </div>

    <!-- File list -->
    <div v-if="files.length" class="file-upload__content">
      <ul class="file-upload__list">
        <li v-for="f in files" :key="f.__key" class="file-upload__item">
          <div class="file-upload__file">
            <div class="file-upload__file-badge">
              {{ getFileExtension(f.name) }}
            </div>

            <div class="file-upload__file-info">
              <div class="file-upload__file-name">
                {{ f.name }}
              </div>

              <div class="file-upload__file-meta">
                <span>{{ formatBytes(f.size) }}</span>
                <template v-if="f.status === 'uploading' && f.progress != null">
                  <span class="file-upload__file-progress-text">
                    {{ Math.round(f.progress) }}% done
                  </span>
                </template>
              </div>

              <!-- Progress bar -->
              <div
                v-if="f.status === 'uploading' && f.progress != null"
                class="file-upload__progress"
              >
                <div class="file-upload__progress-track">
                  <div
                    class="file-upload__progress-fill"
                    :style="{ width: Math.min(100, Math.max(0, f.progress)) + '%' }"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              class="file-upload__file-remove"
              :disabled="disabled || loading"
              @click="removeFile(f)"
            >
              <Icon name="delete" size="sm" />
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Errors -->
    <p v-if="errors.length" class="file-upload__errors" role="alert">
      <span v-for="(e, i) in errors" :key="i" class="file-upload__error">
        {{ e }}
      </span>
    </p>

    <!-- Footer -->
    <div v-if="showFooter && files.length" class="file-upload__footer">
      <button type="button" class="file-upload__btn-cancel" @click="onCancel">Отмена</button>
      <button type="button" class="file-upload__btn-add" @click="onAdd">Добавить файлы</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import type {
  FileUploadEmits,
  FileUploadFileLike,
  FileUploadProps,
  FileUploadSelectEvent,
} from './FileUpload.types';

defineOptions({ name: 'NFileUpload' });

const props = withDefaults(defineProps<FileUploadProps>(), {
  variant: 'primary',
  disabled: false,
  loading: false,

  multiple: false,
  accept: '',
  maxFileSize: undefined,
  fileLimit: undefined,

  dragDrop: true,

  showHint: true,
  showFooter: true,

  modelValue: () => [],
});

const emit = defineEmits<FileUploadEmits>();

const inputRef = ref<HTMLInputElement | null>(null);
const isDragActive = ref(false);

const files = ref<FileUploadFileLike[]>([]);
const errors = ref<string[]>([]);

watch(
  () => props.modelValue,
  (v) => {
    files.value = (v ?? []).map(toInternal);
  },
  { immediate: true }
);

const hintText = computed(() => {
  const parts: string[] = [];

  if (props.accept) parts.push(`Формат: ${props.accept}`);
  if (props.maxFileSize != null) parts.push(`Макс. размер: ${formatBytes(props.maxFileSize)}`);
  if (props.fileLimit != null) parts.push(`Лимит: ${props.fileLimit}`);

  return parts.join(' \u2022 ');
});

const rootClasses = computed(() => ({
  'file-upload': true,
  [`file-upload--${props.variant}`]: true,
  'file-upload--disabled': props.disabled || props.loading,
}));

function openDialog() {
  if (props.disabled || props.loading) return;
  inputRef.value?.click();
}

function onInputChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const list = input.files ? Array.from(input.files) : [];
  handleSelect(list);
  input.value = '';
}

function onDragEnter() {
  if (!props.dragDrop || props.disabled || props.loading) return;
  isDragActive.value = true;
}

function onDragLeave() {
  isDragActive.value = false;
}

function onDrop(e: DragEvent) {
  if (!props.dragDrop || props.disabled || props.loading) return;
  isDragActive.value = false;

  const list = e.dataTransfer?.files ? Array.from(e.dataTransfer.files) : [];

  if (!list.length) return;
  handleSelect(list);
}

function handleSelect(selected: File[]) {
  errors.value = [];

  const next = props.multiple ? [...files.value] : [];
  const validated: File[] = [];

  for (const f of selected) {
    const err = validateFile(f);
    if (err) {
      errors.value.push(err);
      continue;
    }
    validated.push(f);
  }

  if (props.fileLimit != null) {
    const available = Math.max(props.fileLimit - next.length, 0);
    validated.splice(available);

    if (selected.length > available) {
      errors.value.push(`Превышен лимит файлов. Максимум: ${props.fileLimit}.`);
    }
  }

  const appended = validated.map(toInternal);
  next.push(...appended);

  files.value = next;
  emitModel();

  const evt: FileUploadSelectEvent = {
    files: toExternal(files.value),
    originalFiles: validated,
  };

  emit('select', evt);
}

function removeFile(file: FileUploadFileLike) {
  if (props.disabled || props.loading) return;
  files.value = files.value.filter((f) => f.__key !== file.__key);
  emitModel();
  emit('remove', { ...file });
}

function onCancel() {
  files.value = [];
  errors.value = [];
  emitModel();
  emit('cancel');
}

function onAdd() {
  emit('add');
}

function validateFile(f: File): string | null {
  if (props.maxFileSize != null && f.size > props.maxFileSize) {
    return `\u0424\u0430\u0439\u043B "${f.name}" \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439. \u041C\u0430\u043A\u0441. ${formatBytes(props.maxFileSize)}.`;
  }

  if (props.accept) {
    const acceptList = props.accept
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const ok = acceptList.some((rule) => matchAccept(f, rule));

    if (!ok)
      return `\u0424\u0430\u0439\u043B "${f.name}" \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F.`;
  }

  return null;
}

function matchAccept(file: File, rule: string): boolean {
  if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule.toLowerCase());

  if (rule.endsWith('/*')) {
    const prefix = rule.slice(0, -2);
    return file.type.startsWith(prefix + '/');
  }

  return file.type === rule;
}

function emitModel() {
  emit('update:modelValue', toExternal(files.value));
}

function toInternal(f: File | FileUploadFileLike): FileUploadFileLike {
  const file = (f as any).file instanceof File ? (f as any).file : (f as any);

  const key =
    (f as any).__key ??
    `${file.name}_${file.size}_${file.lastModified}_${Math.random().toString(16).slice(2)}`;

  return {
    __key: key,
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    file,
    progress: (f as FileUploadFileLike).progress,
    status: (f as FileUploadFileLike).status ?? 'pending',
  };
}

function toExternal(list: FileUploadFileLike[]): FileUploadFileLike[] {
  return list.map((x) => ({ ...x }));
}

function getFileExtension(name: string): string {
  const ext = name.split('.').pop()?.toUpperCase() ?? '';
  return ext.length > 4 ? ext.slice(0, 4) : ext;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes)) return '';

  const units = ['B', 'KB', 'MB', 'GB'];
  let v = bytes;
  let i = 0;

  while (v >= 1024 && i < units.length - 1) {
    v = v / 1024;
    i++;
  }

  const fixed = i === 0 ? String(Math.round(v)) : v.toFixed(v >= 10 ? 1 : 2);

  return `${fixed} ${units[i]}`;
}
</script>

<style lang="scss" scoped>
.file-upload {
  display: block;
  font-family: var(--font-family-base);
}

.file-upload--disabled {
  opacity: 0.8;
  pointer-events: none;
}

.file-upload__input {
  display: none;
}

/* Dropzone */
.file-upload__dropzone {
  border: var(--border-width-md) dashed var(--color-blue-50);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  cursor: pointer;
  transition:
    border-color var(--motion-standard),
    background-color var(--motion-standard);
  background-color: var(--color-blue-60);

  &:hover {
    border-color: var(--color-green-80);
  }
}

.file-upload__dropzone--active {
  border-color: var(--color-green-90);
  background-color: var(--color-white);
}

.file-upload__dropzone-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  text-align: center;
}

.file-upload__dropzone-icon {
  margin-bottom: var(--space-2);
}

.file-upload__dropzone-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  color: var(--color-grey-70);
}

.file-upload__dropzone-browse {
  color: var(--color-green-90);
  cursor: pointer;
  text-decoration: underline;
  font-weight: var(--font-weight-semibold);
  transition: color var(--motion-standard);

  &:hover {
    color: var(--color-green-100);
  }
}

.file-upload__dropzone-subtitle {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-grey-80);
}

/* Choose button (no drag-drop) */
.file-upload__choose {
  height: var(--size-height-md);
  padding: 0 var(--size-padding-horizontal-md);
  border-radius: var(--radius-xl);
  border: var(--border-width-sm) solid var(--color-blue-30);
  background: var(--color-white);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition:
    border-color var(--motion-standard),
    background-color var(--motion-standard);

  &:hover {
    border-color: var(--color-black);
  }

  &:disabled {
    cursor: not-allowed;
    border-color: var(--color-grey-20);
    color: var(--color-grey-80);
  }
}

/* File list */
.file-upload__content {
  margin-top: var(--space-3);
}

.file-upload__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-2);
}

.file-upload__item {
  border: var(--border-width-sm) solid var(--color-grey-20);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
}

.file-upload__file {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.file-upload__file-badge {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-10);
  height: var(--space-10);
  border-radius: var(--radius-sm);
  background-color: var(--color-blue-60);
  color: var(--color-grey-70);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-xs);
  text-transform: uppercase;
}

.file-upload__file-info {
  flex: 1;
  min-width: 0;
}

.file-upload__file-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  color: var(--color-black);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-upload__file-meta {
  margin-top: var(--space-1);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-grey-80);
}

.file-upload__file-progress-text {
  color: var(--color-green-90);
  font-weight: var(--font-weight-medium);
}

/* Progress bar */
.file-upload__progress {
  margin-top: var(--space-2);
}

.file-upload__progress-track {
  position: relative;
  height: var(--space-1);
  border-radius: var(--radius-toggle-sm);
  background-color: var(--color-blue-40);
  overflow: hidden;
}

.file-upload__progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--color-green-90);
  border-radius: var(--radius-toggle-sm);
  transition: width var(--duration-medium) var(--easing-standard);
}

/* Remove button */
.file-upload__file-remove {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size-height-sm);
  height: var(--size-height-sm);
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--color-grey-80);
  border-radius: var(--radius-toggle-md);
  transition:
    color var(--motion-standard),
    background-color var(--motion-standard);

  &:hover {
    color: var(--color-orange);
    background-color: var(--color-blue-60);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

/* Errors */
.file-upload__errors {
  margin-top: var(--space-3);
  display: grid;
  gap: var(--space-1);
}

.file-upload__error {
  font-size: var(--font-size-xs);
  line-height: var(--line-height-xs);
  color: var(--color-orange);
}

/* Footer */
.file-upload__footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: var(--border-width-sm) solid var(--color-grey-20);
}

.file-upload__btn-cancel {
  height: var(--size-height-md);
  padding: 0 var(--size-padding-horizontal-md);
  border-radius: var(--radius-xl);
  border: var(--border-width-sm) solid var(--color-blue-30);
  background: var(--color-white);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  color: var(--color-black);
  cursor: pointer;
  transition:
    border-color var(--motion-standard),
    background-color var(--motion-standard);

  &:hover {
    border-color: var(--color-black);
  }
}

.file-upload__btn-add {
  height: var(--size-height-md);
  padding: 0 var(--size-padding-horizontal-md);
  border-radius: var(--radius-xl);
  border: var(--border-width-sm) solid transparent;
  background-color: var(--color-green-90);
  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-sm);
  color: var(--color-white);
  cursor: pointer;
  transition: background-color var(--motion-standard);

  &:hover {
    background-color: var(--color-green-80);
  }

  &:active {
    background-color: var(--color-green-100);
  }
}
</style>
