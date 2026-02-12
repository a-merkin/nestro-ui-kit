export type DatePickerMode = 'single' | 'range';

export interface DatePickerProps {
  /** Выбранная дата (строка YYYY-MM-DD) или null */
  modelValue: string | null;
  /** Placeholder текст */
  placeholder?: string;
  /** Заблокировать компонент */
  disabled?: boolean;
  /** Состояние ошибки */
  error?: boolean;
  /** Текст ошибки */
  errorMessage?: string;
  /** Лейбл над полем */
  label?: string;
  /** Минимальная доступная дата (YYYY-MM-DD) */
  minDate?: string;
  /** Максимальная доступная дата (YYYY-MM-DD) */
  maxDate?: string;
  /** Возможность очистки */
  clearable?: boolean;
  /** Формат отображения даты */
  displayFormat?: 'DD.MM.YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY';
}

export interface DatePickerEmits {
  (e: 'update:modelValue', value: string | null): void;
  (e: 'change', value: string | null): void;
  (e: 'clear'): void;
}
