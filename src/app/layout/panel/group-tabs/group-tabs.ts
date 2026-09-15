import { RouterLink, RouterLinkActive } from '@angular/router';
import { computed, Component, ChangeDetectionStrategy } from '@angular/core';

import { groupOf, routesIn } from '@shared/constants/navigation';
import { injectRouterUrl } from '@shared/utils/inject-router-url';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-group-tabs',
  host: { class: 'lg:hidden' },
  templateUrl: './group-tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupTabs {
  private readonly url = injectRouterUrl();

  protected readonly siblings = computed(() => {
    const group = groupOf(this.url());
    return group ? routesIn(group) : [];
  });
}
