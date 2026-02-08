export type LoaderSize = 'sm' | 'md' | 'lg';
export type LoaderVariant = 'primary' | 'secondary' | 'white';

export interface LoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  text?: string;
  overlay?: boolean;
}
