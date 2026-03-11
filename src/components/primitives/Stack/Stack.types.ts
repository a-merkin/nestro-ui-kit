import type { NBoxAs, SpacingToken } from '../Box/Box.types';
import type { FlexAlign, FlexJustify } from '../Flex/Flex.types';

export type NStackProps = {
  as?: NBoxAs;

  gap?: SpacingToken;

  align?: FlexAlign;
  justify?: FlexJustify;
};
