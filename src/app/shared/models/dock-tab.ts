import type { NavGroup } from './nav-group';

export interface DockTab {
  readonly icon: string;
  readonly label: string;
  readonly group: NavGroup;
}
