import type { ColorToken } from '../Box/Box.types';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg';
export type TextWeight = 'normal' | 'medium' | 'bold';
export type TextAs = 'span' | 'p' | 'div' | 'label';

export type NTextProps = {
  as?: TextAs;

  size?: TextSize;

  weight?: TextWeight;

  color?: ColorToken;

  truncate?: boolean;
};
