export type IconSize = 'sm' | 'md' | 'lg';

export type IconName =
  | 'check'
  | 'close'
  | 'arrow-down'
  | 'edit'
  | 'delete'
  | 'plus'
  | 'download'
  | 'magnifier'
  | 'setting'
  | 'unite';

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  customClass?: string;
}
