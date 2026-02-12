export type IconSize = 'sm' | 'md' | 'lg';

export type IconName =
  | 'check'
  | 'close'
  | 'arrow-down'
  | 'arrow-up'
  | 'arrow-left'
  | 'arrow-right'
  | 'edit'
  | 'delete'
  | 'plus'
  | 'download'
  | 'magnifier'
  | 'setting'
  | 'unite'
  | 'loading'
  | 'calendar'
  | 'minus';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  customClass?: string;
}
