import type { IconName } from '../Icon/Icon.types';

export interface ChipProps {
  label?: string;
  icon?: IconName;
  image?: string;
  removable?: boolean;
  disabled?: boolean;
}

export interface ChipEmits {
  (e: 'remove'): void;
}
