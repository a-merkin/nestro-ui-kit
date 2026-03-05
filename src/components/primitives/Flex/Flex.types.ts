import type { NBoxAs, SpacingToken } from '../Box/Box.types';

export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around';


export type NFlexProps = {
  as?: NBoxAs;

  align?: FlexAlign;
  justify?: FlexJustify;

  gap?: SpacingToken;

  wrap?: boolean;
};