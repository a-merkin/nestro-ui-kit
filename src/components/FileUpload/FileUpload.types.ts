export type FileUploadMode = 'basic' | 'advanced';
export type FileUploadVariant = 'primary' | 'secondary';

export type FileUploadFileLike = {
  __key: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
};

export type FileUploadSelectEvent = {
  files: FileUploadFileLike[];
  originalFiles: File[];
};

export type FileUploadUploadEvent = {
  files: FileUploadFileLike[];
};

export type FileUploadRemoveEvent = {
  file: FileUploadFileLike;
  index: number;
};

export type FileUploadProps = {
  modelValue?: FileUploadFileLike[];

  mode?: FileUploadMode;
  variant?: FileUploadVariant;

  disabled?: boolean;
  loading?: boolean;

  multiple?: boolean;
  accept?: string;
  maxFileSize?: number;
  fileLimit?: number;

  auto?: boolean;
  dragDrop?: boolean;

  chooseLabel?: string;
  uploadLabel?: string;
  clearLabel?: string;
  dropzoneLabel?: string;
  emptyLabel?: string;
  showHint?: boolean;
};

export type FileUploadEmits = {
  (e: 'update:modelValue', value: FileUploadFileLike[]): void;
  (e: 'select', payload: FileUploadSelectEvent): void;
  (e: 'upload', payload: FileUploadUploadEvent): void;
  (e: 'remove', payload: FileUploadRemoveEvent): void;
  (e: 'clear'): void;
};