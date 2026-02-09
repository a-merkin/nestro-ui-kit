export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';
export type TooltipTrigger = 'hover' | 'click' | 'manual';

export interface TooltipProps {
  text?: string;
  placement?: TooltipPlacement;
  offset?: number;
  disabled?: boolean;
  onlyIfTruncated?: boolean;
  trigger?: TooltipTrigger;
}
