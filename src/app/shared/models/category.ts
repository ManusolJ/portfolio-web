import type { LucideIcon } from '@lucide/angular';

import type { NavGroup } from './nav-group';

export interface Category {
  route: string;
  group: NavGroup;
  icon: LucideIcon;
  category: string;
}
