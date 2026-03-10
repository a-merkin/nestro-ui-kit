export type CardVariant = 'default' | 'outlined' | 'elevated';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export type CardProps = {
  variant?: CardVariant;
  padding?: CardPadding;

  clickable?: boolean;
  disabled?: boolean;
  tag?: keyof HTMLElementTagNameMap;
};

export type CardEmits = {
  (e: 'click', event: MouseEvent): void;
};
