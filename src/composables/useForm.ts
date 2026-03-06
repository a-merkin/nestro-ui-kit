import { reactive, readonly } from 'vue';

export interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
}

export interface UseFormReturn<T extends Record<string, unknown>> {
  values: T;
  errors: Readonly<Record<string, string | undefined>>;
  setError: (field: keyof T & string, message: string) => void;
  clearError: (field: keyof T & string) => void;
  clearErrors: () => void;
  hasError: (field: keyof T & string) => boolean;
  handleSubmit: () => void | Promise<void>;
  reset: () => void;
}

export function useForm<T extends Record<string, unknown>>(
  options: UseFormOptions<T>,
): UseFormReturn<T> {
  const values = reactive({ ...options.initialValues }) as T;
  const errors: Record<string, string | undefined> = reactive({});

  function setError(field: keyof T & string, message: string) {
    errors[field] = message;
  }

  function clearError(field: keyof T & string) {
    delete errors[field];
  }

  function clearErrors() {
    for (const key of Object.keys(errors)) {
      delete errors[key];
    }
  }

  function hasError(field: keyof T & string): boolean {
    return !!errors[field];
  }

  async function handleSubmit() {
    clearErrors();
    await options.onSubmit(values);
  }

  function reset() {
    clearErrors();
    Object.assign(values, { ...options.initialValues });
  }

  return {
    values,
    errors: readonly(errors),
    setError,
    clearError,
    clearErrors,
    hasError,
    handleSubmit,
    reset,
  };
}
