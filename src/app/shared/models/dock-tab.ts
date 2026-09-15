import type { LucideIcon } from '@lucide/angular';

import type { NavGroup } from './nav-group';

export interface DockTab {
  readonly label: string;
  readonly group: NavGroup;
  readonly icon: LucideIcon;
}
