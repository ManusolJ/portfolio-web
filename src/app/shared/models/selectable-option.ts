import type { OptionIcon } from './option-icon';

export interface SelectableOption {
  readonly value: string;
  readonly label: string;
  readonly href?: string;
  readonly icon: OptionIcon;
}
