export type ButtonLayout = 'stacked' | 'horizontal';

export interface InputNumberProps {
  /** Числовое значение */
  modelValue: number | null;
  /** Минимальное значение */
  min?: number;
  /** Максимальное значение */
  max?: number;
  /** Шаг инкремента/декремента */
  step?: number;
  /** Минимальное количество знаков после точки */
  minFractionDigits?: number;
  /** Максимальное количество знаков после точки */
  maxFractionDigits?: number;
  /** Префикс (отображается перед значением) */
  prefix?: string;
  /** Суффикс (отображается после значения) */
  suffix?: string;
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
  /** Показывать кнопки +/- */
  showButtons?: boolean;
  /** Расположение кнопок */
  buttonLayout?: ButtonLayout;
  /** Использовать разделитель групп (пробел) */
  useGrouping?: boolean;
}

export interface InputNumberEmits {
  (e: 'update:modelValue', value: number | null): void;
  (e: 'change', value: number | null): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}
