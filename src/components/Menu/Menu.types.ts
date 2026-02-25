import type { IconName } from '../Icon/Icon.types';

export interface MenuItem {
  /** Текст пункта меню */
  label?: string;
  /** Иконка из Icon-компонента */
  icon?: IconName;
  /** Callback при клике */
  command?: (event: MenuCommandEvent) => void;
  /** Внешняя ссылка */
  url?: string;
  /** target для ссылки */
  target?: string;
  /** Пункт заблокирован */
  disabled?: boolean;
  /** Пункт скрыт */
  visible?: boolean;
  /** Разделитель вместо пункта */
  separator?: boolean;
  /** Вложенные пункты (подменю) */
  items?: MenuItem[];
  /** CSS-класс пункта */
  class?: string;
  /** Уникальный ключ */
  key?: string;
}

export interface MenuCommandEvent {
  /** Оригинальное DOM-событие */
  originalEvent: Event;
  /** Пункт меню, по которому кликнули */
  item: MenuItem;
}

export interface MenuProps {
  /** Массив пунктов меню */
  model: MenuItem[];
  /** Режим popup (по умолчанию inline) */
  popup?: boolean;
}

export interface MenuEmits {
  (e: 'select', event: MenuCommandEvent): void;
}
