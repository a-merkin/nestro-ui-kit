import type { IconName } from '../Icon/Icon.types';

export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';
export type SpeedDialType = 'floating' | 'static';

export interface SpeedDialAction {
  /** Иконка действия */
  icon: IconName;
  /** Подсказка при наведении */
  label?: string;
  /** Callback при клике */
  command?: () => void;
  /** Заблокировано */
  disabled?: boolean;
  /** Скрыто */
  visible?: boolean;
  /** CSS-класс */
  class?: string;
  /** Уникальный ключ */
  key?: string;
}

export interface SpeedDialProps {
  /** Массив действий */
  model: SpeedDialAction[];
  /** Направление раскрытия */
  direction?: SpeedDialDirection;
  /** Тип кнопки: floating (FAB) или static */
  type?: SpeedDialType;
  /** Иконка основной кнопки */
  icon?: IconName;
  /** Заблокировать компонент */
  disabled?: boolean;
}

export interface SpeedDialEmits {
  (e: 'open'): void;
  (e: 'close'): void;
}
