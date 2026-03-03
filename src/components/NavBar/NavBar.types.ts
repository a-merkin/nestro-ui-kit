export interface NavBarItem {
  id: string;
  label?: string;
}

export interface NavBarProps {
  items: NavBarItem[];
  modelValue?: string;
}

export interface NavBarEmits {
  (e: 'update:modelValue', id: string): void;
}
