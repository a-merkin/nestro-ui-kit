import type { ColorToken } from '../Box/Box.types';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg';
export type HeadingWeight = 'normal' | 'medium' | 'bold';

export type NHeadingProps = {
  level?: HeadingLevel;

  size?: HeadingSize;

  weight?: HeadingWeight;

  color?: ColorToken;

  truncate?: boolean;
};
