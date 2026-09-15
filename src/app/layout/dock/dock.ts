import { RouterLink } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { computed, Component, ChangeDetectionStrategy } from '@angular/core';

import type { NavGroup } from '@shared/models/nav-group';

import { injectRouterUrl } from '@shared/utils/inject-router-url';
import { groupOf, routesIn, DOCK_TABS } from '@shared/constants/navigation';

@Component({
  imports: [NgComponentOutlet, RouterLink],
  selector: 'app-dock',
  templateUrl: './dock.html',
  host: { class: 'lg:hidden' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dock {
  private readonly url = injectRouterUrl();

  protected readonly tabs = DOCK_TABS;
  protected readonly navLabel = $localize`:@@nav.label:Secciones`;

  protected readonly activeGroup = computed(() => groupOf(this.url()));

  protected firstRouteOf(group: NavGroup): string {
    return routesIn(group)[0]?.route ?? '/';
  }
}
