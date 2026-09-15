import {
  LucideMail,
  LucideRoute,
  LucideHouse,
  LucideIdCard,
  LucideLayers,
  LucideServer,
  LucideGrid2x2,
  LucideEllipsis,
  LucideBriefcase,
  LucideFolderOpen,
  LucideGraduationCap,
} from '@lucide/angular';

import type { DockTab } from '@shared/models/dock-tab';
import type { Category } from '@shared/models/category';
import type { NavGroup } from '@shared/models/nav-group';

export const CATEGORY_LIST: readonly Category[] = [
  {
    route: '/',
    category: $localize`:@@nav.about:Sobre mí`,
    icon: LucideIdCard,
    group: 'home',
  },
  {
    route: '/education',
    category: $localize`:@@nav.education:Educación`,
    icon: LucideGraduationCap,
    group: 'history',
  },
  {
    route: '/experience',
    category: $localize`:@@nav.experience:Experiencia`,
    icon: LucideBriefcase,
    group: 'history',
  },
  {
    route: '/skills',
    category: $localize`:@@nav.skills:Habilidades`,
    icon: LucideLayers,
    group: 'showcase',
  },
  {
    route: '/projects',
    category: $localize`:@@nav.projects:Proyectos`,
    icon: LucideGrid2x2,
    group: 'showcase',
  },
  {
    route: '/homelab',
    category: $localize`:@@nav.homelab:Servidor`,
    icon: LucideServer,
    group: 'more',
  },
  {
    route: '/contact',
    category: $localize`:@@nav.contact:Contacto`,
    icon: LucideMail,
    group: 'more',
  },
];

export const DOCK_TABS: readonly DockTab[] = [
  {
    group: 'home',
    label: $localize`:@@dock.home:Inicio`,
    icon: LucideHouse,
  },
  {
    group: 'history',
    label: $localize`:@@dock.history:Trayectoria`,
    icon: LucideRoute,
  },
  {
    group: 'showcase',
    label: $localize`:@@dock.showcase:Portafolio`,
    icon: LucideFolderOpen,
  },
  {
    group: 'more',
    label: $localize`:@@dock.more:Más`,
    icon: LucideEllipsis,
  },
];

export function groupOf(url: string): NavGroup | undefined {
  return CATEGORY_LIST.find((category) => category.route === url)?.group;
}

export function routesIn(group: NavGroup): readonly Category[] {
  return CATEGORY_LIST.filter((category) => category.group === group);
}
