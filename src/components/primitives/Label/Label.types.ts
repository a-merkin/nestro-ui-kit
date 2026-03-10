import type { ColorToken } from '../Box/Box.types';

export type LabelSize = 'xs' | 'sm' | 'md';
export type LabelWeight = 'normal' | 'medium' | 'bold';

export type NLabelProps = {
  forId?: string;

  required?: boolean;

  size?: LabelSize;

  weight?: LabelWeight;

  color?: ColorToken;
};
