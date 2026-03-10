export type SpacingToken =
  | '0'
  | 'space-1'
  | 'space-2'
  | 'space-3'
  | 'space-4'
  | 'space-5'
  | 'space-6'
  | 'space-8'
  | 'space-10';

export type RadiusToken =
  | 'radius-sm'
  | 'radius-md'
  | 'radius-lg'
  | 'radius-xl'
  | 'radius-round'
  | 'radius-toggle-sm'
  | 'radius-toggle-md'
  | 'radius-toggle-lg';

export type ColorToken =
  | 'color-white'
  | 'color-black'
  | 'color-green-100'
  | 'color-green-90'
  | 'color-green-80'
  | 'color-green-50'
  | 'color-blue-70'
  | 'color-blue-60'
  | 'color-blue-50'
  | 'color-blue-40'
  | 'color-blue-30'
  | 'color-grey-100'
  | 'color-grey-80'
  | 'color-grey-70'
  | 'color-grey-50'
  | 'color-grey-40'
  | 'color-grey-20'
  | 'color-orange'
  | 'color-bg-input'
  | 'color-bg-input-disabled'
  | 'color-text-error'
  | 'color-text-disabled'
  | 'color-text-placeholder'
  | 'color-stroke-primary'
  | 'color-stroke-error'
  | 'color-stroke-disabled'
  | 'color-scrollbar-thumb'
  | 'color-scrollbar-track'
  | 'color-bg-primary'
  | 'color-bg-overlay-white-1'
  | 'color-bg-overlay-white-2'
  | 'color-bg-overlay-green'
  | 'color-bg-overlay-blue'
  | 'color-bg-secondary';

export type NBoxAs = keyof HTMLElementTagNameMap;

export type NBoxProps = {
  as?: NBoxAs;

  padding?: SpacingToken;
  margin?: SpacingToken;

  radius?: RadiusToken;
  bg?: ColorToken;
};
