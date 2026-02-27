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

export type FileUploadProps = {
  modelValue?: FileUploadFileLike[];

  variant?: FileUploadVariant;

  disabled?: boolean;
  loading?: boolean;

  multiple?: boolean;
  accept?: string;
  maxFileSize?: number;
  fileLimit?: number;

  dragDrop?: boolean;

  chooseLabel?: string;
  dropzoneLabel?: string;
  showHint?: boolean;
};

export type FileUploadEmits = {
  (e: 'update:modelValue', value: FileUploadFileLike[]): void;
  (e: 'select', payload: FileUploadSelectEvent): void;
};