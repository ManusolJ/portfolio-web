import {
  lucideMail,
  lucideRoute,
  lucideHouse,
  lucideIdCard,
  lucideLayers,
  lucideServer,
  lucideGrid2x2,
  lucideEllipsis,
  lucideBriefcase,
  lucideFolderOpen,
  lucideGraduationCap,
} from '@ng-icons/lucide';

import type { DockTab } from '@shared/models/dock-tab';
import type { Category } from '@shared/models/category';
import type { NavGroup } from '@shared/models/nav-group';

export const CATEGORY_LIST: readonly Category[] = [
  {
    route: '/',
    category: $localize`:@@nav.about:Sobre mí`,
    icon: lucideIdCard,
    group: 'home',
  },
  {
    route: '/education',
    category: $localize`:@@nav.education:Educación`,
    icon: lucideGraduationCap,
    group: 'history',
  },
  {
    route: '/experience',
    category: $localize`:@@nav.experience:Experiencia`,
    icon: lucideBriefcase,
    group: 'history',
  },
  {
    route: '/skills',
    category: $localize`:@@nav.skills:Habilidades`,
    icon: lucideLayers,
    group: 'showcase',
  },
  {
    route: '/projects',
    category: $localize`:@@nav.projects:Proyectos`,
    icon: lucideGrid2x2,
    group: 'showcase',
  },
  {
    route: '/homelab',
    category: $localize`:@@nav.homelab:Servidor`,
    icon: lucideServer,
    group: 'more',
  },
  {
    route: '/contact',
    category: $localize`:@@nav.contact:Contacto`,
    icon: lucideMail,
    group: 'more',
  },
];

export const DOCK_TABS: readonly DockTab[] = [
  {
    group: 'home',
    label: $localize`:@@dock.home:Inicio`,
    icon: lucideHouse,
  },
  {
    group: 'history',
    label: $localize`:@@dock.history:Trayectoria`,
    icon: lucideRoute,
  },
  {
    group: 'showcase',
    label: $localize`:@@dock.showcase:Portafolio`,
    icon: lucideFolderOpen,
  },
  {
    group: 'more',
    label: $localize`:@@dock.more:Más`,
    icon: lucideEllipsis,
  },
];

export function groupOf(url: string): NavGroup | undefined {
  return CATEGORY_LIST.find((category) => category.route === url)?.group;
}

export function routesIn(group: NavGroup): readonly Category[] {
  return CATEGORY_LIST.filter((category) => category.group === group);
}
