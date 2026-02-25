<template>
  <div
    :class="rootClasses"
    @dragenter.prevent="onDragEnter"
    @dragover.prevent
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <input
      ref="inputRef"
      class="file-upload__input"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled || loading"
      @change="onInputChange"
    />

    <div
      v-if="dragDrop"
      class="file-upload__dropzone"
      :class="{ 'file-upload__dropzone--active': isDragActive }"
      @click="openDialog"
    >
      <div class="file-upload__dropzone-inner">
        <slot name="dropzone">
          <div class="file-upload__dropzone-title">
            {{ dropzoneLabelComputed }}
          </div>

          <div
            v-if="showHint && hintText"
            class="file-upload__dropzone-subtitle"
          >
            {{ hintText }}
          </div>
        </slot>
      </div>
    </div>

    <div v-else>
      <button
        type="button"
        class="file-upload__choose"
        :disabled="disabled || loading"
        @click="openDialog"
      >
        {{ chooseLabelComputed }}
      </button>
    </div>

    <div v-if="files.length" class="file-upload__content">
      <ul class="file-upload__list">
        <li
          v-for="f in files"
          :key="f.__key"
          class="file-upload__item"
        >
          <div class="file-upload__file">
            <div class="file-upload__file-name">
              {{ f.name }}
            </div>

            <div class="file-upload__file-meta">
              {{ formatBytes(f.size) }}
              <span v-if="f.type">• {{ f.type }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- ERRORS -->
    <p
      v-if="errors.length"
      class="file-upload__errors"
      role="alert"
    >
      <span
        v-for="(e, i) in errors"
        :key="i"
        class="file-upload__error"
      >
        {{ e }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
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

  chooseLabel: 'Choose file',
  dropzoneLabel: 'Drag and drop files or click',
  showHint: true,

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

const chooseLabelComputed = computed(() => props.chooseLabel);
const dropzoneLabelComputed = computed(() => props.dropzoneLabel);

const hintText = computed(() => {
  const parts: string[] = [];

  if (props.accept) parts.push(`Accept: ${props.accept}`);
  if (props.maxFileSize != null)
    parts.push(`Max size: ${formatBytes(props.maxFileSize)}`);
  if (props.fileLimit != null)
    parts.push(`Limit: ${props.fileLimit}`);

  return parts.join(' • ');
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

  const list = e.dataTransfer?.files
    ? Array.from(e.dataTransfer.files)
    : [];

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
      errors.value.push(
        `File limit exceeded. Max ${props.fileLimit}.`
      );
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

function validateFile(f: File): string | null {
  if (props.maxFileSize != null && f.size > props.maxFileSize) {
    return `File "${f.name}" is too large. Max ${formatBytes(
      props.maxFileSize
    )}.`;
  }

  if (props.accept) {
    const acceptList = props.accept
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const ok = acceptList.some((rule) =>
      matchAccept(f, rule)
    );

    if (!ok) return `File "${f.name}" is not allowed.`;
  }

  return null;
}

function matchAccept(file: File, rule: string): boolean {
  if (rule.startsWith('.'))
    return file.name.toLowerCase().endsWith(rule.toLowerCase());

  if (rule.endsWith('/*')) {
    const prefix = rule.slice(0, -2);
    return file.type.startsWith(prefix + '/');
  }

  return file.type === rule;
}

function emitModel() {
  emit('update:modelValue', toExternal(files.value));
}

function toInternal(
  f: File | FileUploadFileLike
): FileUploadFileLike {
  const file =
    (f as any).file instanceof File
      ? (f as any).file
      : (f as any);

  const key =
    (f as any).__key ??
    `${file.name}_${file.size}_${file.lastModified}_${Math.random()
      .toString(16)
      .slice(2)}`;

  return {
    __key: key,
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    file,
  };
}

function toExternal(
  list: FileUploadFileLike[]
): FileUploadFileLike[] {
  return list.map((x) => ({ ...x }));
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

  const fixed =
    i === 0
      ? String(Math.round(v))
      : v.toFixed(v >= 10 ? 1 : 2);

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

.file-upload__dropzone {
  border: var(--border-width-sm) dashed var(--color-grey-30);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  cursor: pointer;
  transition: border-color var(--motion-standard), var(--motion-standard) ease;
}

.file-upload__dropzone--active {
  border-color: var(--color-green-90);
  background-color: var(--color-green-10);
}

.file-upload__dropzone-inner {
  text-align: center;
}

.file-upload__dropzone-title {
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-2);
}

.file-upload__dropzone-subtitle {
  font-size: var(--font-size-xs);
  color: var(--color-grey-80);
}

.file-upload__choose {
  height: var(--size-height-md);
  padding: 0 var(--size-padding-horizontal-md);
  border-radius: var(--radius-xl);
  border: var(--border-width-sm) solid var(--color-grey-30);
  background: var(--color-white);
  cursor: pointer;
}

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
  border: 1px solid var(--color-grey-20);
  border-radius: var(--radius-xl);
  padding: var(--space-3);
}

.file-upload__file-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.file-upload__file-meta {
  margin-top: var(--space-1);
  font-size: var(--font-size-xs);
  color: var(--color-grey-80);
}

.file-upload__errors {
  margin-top: var(--space-3);
  display: grid;
  gap: var(--space-1);
}

.file-upload__error {
  font-size: var(--font-size-xs);
  color: var(--color-red-90);
}
</style>