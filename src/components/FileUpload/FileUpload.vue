<template>
    <div :class="rootClasses" @dragenter.prevent="onDragEnter" @dragover.prevent @dragleave.prevent="onDragLeave" @drop.prevent="onDrop">
      <input
        ref="inputRef"
        class="file-upload__input"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled || loading"
        @change="onInputChange"
      />
  
      <template v-if="mode === 'basic'">
        <button
          type="button"
          class="file-upload__choose"
          :disabled="disabled || loading"
          :aria-busy="loading || undefined"
          @click="openDialog"
        >
          <slot v-if="$slots['icon-left']" name="icon-left" />
          <span class="file-upload__choose-text">
            {{ chooseLabelComputed }}
          </span>
          <slot v-if="$slots['icon-right']" name="icon-right" />
        </button>
  
        <p v-if="showHint" class="file-upload__hint">
          <slot name="hint">
            {{ hintText }}
          </slot>
        </p>
      </template>
  
      <template v-else>
        <div class="file-upload__header">
          <div class="file-upload__actions">
            <button
              type="button"
              class="file-upload__btn file-upload__btn--choose"
              :disabled="disabled || loading"
              :aria-busy="loading || undefined"
              @click="openDialog"
            >
              {{ chooseLabelComputed }}
            </button>
  
            <button
              v-if="showUploadButton"
              type="button"
              class="file-upload__btn file-upload__btn--upload"
              :disabled="disabled || loading || !files.length"
              :aria-busy="loading || undefined"
              @click="upload"
            >
              {{ uploadLabelComputed }}
            </button>
  
            <button
              v-if="showClearButton"
              type="button"
              class="file-upload__btn file-upload__btn--clear"
              :disabled="disabled || loading || !files.length"
              @click="clear"
            >
              {{ clearLabelComputed }}
            </button>
          </div>
  
          <div v-if="showHint" class="file-upload__meta">
            <slot name="hint">
              {{ hintText }}
            </slot>
          </div>
        </div>
  
        <div v-if="dragDrop" class="file-upload__dropzone" :class="{ 'file-upload__dropzone--active': isDragActive }" @click="openDialog">
          <div class="file-upload__dropzone-inner">
            <slot name="dropzone">
              <div class="file-upload__dropzone-title">{{ dropzoneLabelComputed }}</div>
              <div class="file-upload__dropzone-subtitle">{{ hintText }}</div>
            </slot>
          </div>
        </div>
  
        <div v-if="files.length" class="file-upload__content">
          <ul class="file-upload__list">
            <li v-for="(f, idx) in files" :key="f.__key" class="file-upload__item">
              <div class="file-upload__file">
                <div class="file-upload__file-name">{{ f.name }}</div>
                <div class="file-upload__file-meta">
                  {{ formatBytes(f.size) }}
                  <span v-if="f.type">• {{ f.type }}</span>
                </div>
              </div>
  
              <button
                type="button"
                class="file-upload__remove"
                :disabled="disabled || loading"
                @click="removeAt(idx)"
                aria-label="Remove file"
              >
                ✕
              </button>
            </li>
          </ul>
        </div>
  
        <div v-else class="file-upload__empty">
          <slot name="empty">
            {{ emptyLabelComputed }}
          </slot>
        </div>
  
        <p v-if="errors.length" class="file-upload__errors" role="alert">
          <span v-for="(e, i) in errors" :key="i" class="file-upload__error">{{ e }}</span>
        </p>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import type { FileUploadEmits, FileUploadFileLike, FileUploadProps, FileUploadSelectEvent } from './FileUpload.types';
  
  defineOptions({ name: 'NFileUpload' });
  
  const props = withDefaults(defineProps<FileUploadProps>(), {
    mode: 'advanced',
    variant: 'primary',
    disabled: false,
    loading: false,
  
    multiple: false,
    accept: '',
    maxFileSize: undefined,
    fileLimit: undefined,
  
    auto: false,
    dragDrop: true,
  
    chooseLabel: 'Choose',
    uploadLabel: 'Upload',
    clearLabel: 'Clear',
    dropzoneLabel: 'Drag and drop files or click',
    emptyLabel: 'No files selected',
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
  const uploadLabelComputed = computed(() => props.uploadLabel);
  const clearLabelComputed = computed(() => props.clearLabel);
  const dropzoneLabelComputed = computed(() => props.dropzoneLabel);
  const emptyLabelComputed = computed(() => props.emptyLabel);
  
  const showUploadButton = computed(() => !props.auto);
  const showClearButton = computed(() => true);
  
  const hintText = computed(() => {
    const parts: string[] = [];
    if (props.accept) parts.push(`Accept: ${props.accept}`);
    if (props.maxFileSize != null) parts.push(`Max size: ${formatBytes(props.maxFileSize)}`);
    if (props.fileLimit != null) parts.push(`Limit: ${props.fileLimit}`);
    return parts.join(' • ');
  });
  
  const rootClasses = computed(() => ({
    'file-upload': true,
    [`file-upload--${props.mode}`]: true,
    [`file-upload--${props.variant}`]: true,
    'file-upload--disabled': props.disabled || props.loading,
    'file-upload--drag-active': isDragActive.value,
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
    if (!props.dragDrop) return;
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
        errors.value.push(`File limit exceeded. Max ${props.fileLimit}.`);
      }
    }
  
    const appended = validated.map(toInternal);
    next.push(...appended);
  
    files.value = next;
    emitModel();
  
    const evt: FileUploadSelectEvent = { files: toExternal(files.value), originalFiles: validated };
    emit('select', evt);
  
    if (props.auto && files.value.length) upload();
  }
  
  function validateFile(f: File): string | null {
    if (props.maxFileSize != null && f.size > props.maxFileSize) {
      return `File "${f.name}" is too large. Max ${formatBytes(props.maxFileSize)}.`;
    }
    if (props.accept) {
      const acceptList = props.accept.split(',').map((s) => s.trim()).filter(Boolean);
      const ok = acceptList.some((rule) => matchAccept(f, rule));
      if (!ok) return `File "${f.name}" is not allowed.`;
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
  
  function removeAt(index: number) {
    if (props.disabled || props.loading) return;
    const removed = files.value[index];
    const next = files.value.slice();
    next.splice(index, 1);
    files.value = next;
    emitModel();
    emit('remove', { file: toExternal([removed])[0], index });
  }
  
  function clear() {
    if (props.disabled || props.loading) return;
    files.value = [];
    errors.value = [];
    emitModel();
    emit('clear');
  }
  
  async function upload() {
    if (props.disabled || props.loading) return;
    if (!files.value.length) return;
  
    emit('upload', { files: toExternal(files.value) });
  }
  
  function emitModel() {
    emit('update:modelValue', toExternal(files.value));
  }
  
  function toInternal(f: File | FileUploadFileLike): FileUploadFileLike {
    const file = (f as any).file instanceof File ? (f as any).file : (f as any);
    const key = (f as any).__key ?? `${file.name}_${file.size}_${file.lastModified}_${Math.random().toString(16).slice(2)}`;
    return {
      __key: key,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      file,
    };
  }
  
  function toExternal(list: FileUploadFileLike[]): FileUploadFileLike[] {
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
    const fixed = i === 0 ? String(Math.round(v)) : v.toFixed(v >= 10 ? 1 : 2);
    return `${fixed} ${units[i]}`;
  }
  </script>
  
  <style scoped>
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
  
  .file-upload__choose {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
  
    height: var(--size-height-md);
    padding: 0 var(--size-padding-horizontal-md);
    border-radius: var(--radius-xl);
    border: 1px solid transparent;
  
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
  }
  
  .file-upload__choose-text {
    white-space: nowrap;
  }
  
  .file-upload__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    margin-bottom: var(--space-3);
  }
  
  .file-upload__actions {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
  
  .file-upload__btn {
    height: var(--size-height-md);
    padding: 0 var(--size-padding-horizontal-md);
    border-radius: var(--radius-xl);
    border: 1px solid transparent;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease;
  }
  
  .file-upload__meta {
    font-size: var(--font-size-xs);
    line-height: var(--line-height-sm);
    color: var(--color-grey-80);
  }
  
  .file-upload__dropzone {
    border: 1px dashed var(--color-grey-30);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
    cursor: pointer;
    transition: border-color 0.2s ease, background-color 0.2s ease;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  
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
  
  .file-upload__remove {
    width: var(--size-height-md);
    height: var(--size-height-md);
    border-radius: var(--radius-round);
    border: 1px solid var(--color-grey-20);
    background: var(--color-white);
    cursor: pointer;
  }
  
  .file-upload__empty {
    margin-top: var(--space-3);
    font-size: var(--font-size-sm);
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
  
  .file-upload--primary .file-upload__choose,
  .file-upload--primary .file-upload__btn--choose,
  .file-upload--primary .file-upload__btn--upload {
    background-color: var(--color-green-90);
    color: var(--color-white);
  }
  
  .file-upload--primary .file-upload__choose:hover,
  .file-upload--primary .file-upload__btn--choose:hover,
  .file-upload--primary .file-upload__btn--upload:hover {
    background-color: var(--color-green-80);
  }
  
  .file-upload--primary .file-upload__btn--clear {
    background-color: var(--color-white);
    border-color: var(--color-grey-20);
    color: var(--color-black);
  }
  
  .file-upload--secondary .file-upload__choose,
  .file-upload--secondary .file-upload__btn {
    background-color: var(--color-white);
    border-color: var(--color-blue-30);
    color: var(--color-black);
  }
  </style>