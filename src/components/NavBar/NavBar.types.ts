import type { IconName } from '../Icon/Icon.types';

export interface NavBarItem {
  id: string;
  label?: string;
  icon?: IconName;
}

export interface NavBarProps {
  items: NavBarItem[];
  modelValue?: string;
}

export interface NavBarEmits {
  (e: 'update:modelValue', id: string): void;
}
