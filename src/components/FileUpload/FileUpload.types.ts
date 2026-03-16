export type FileUploadVariant = 'primary' | 'secondary';

export type FileUploadStatus = 'pending' | 'uploading' | 'done' | 'error';

export type FileUploadFileLike = {
  __key: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
  progress?: number;
  status?: FileUploadStatus;
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
  required?: boolean;

  error?: boolean;
  errorMessage?: string;

  multiple?: boolean;
  accept?: string;
  maxFileSize?: number;
  fileLimit?: number;

  dragDrop?: boolean;

  showHint?: boolean;
  showFooter?: boolean;
};

export type FileUploadEmits = {
  (e: 'update:modelValue', value: FileUploadFileLike[]): void;
  (e: 'select', payload: FileUploadSelectEvent): void;
  (e: 'remove', file: FileUploadFileLike): void;
  (e: 'cancel'): void;
  (e: 'add'): void;
};
