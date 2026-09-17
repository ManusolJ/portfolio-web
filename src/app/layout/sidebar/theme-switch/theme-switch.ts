import { lucideSun, lucideMoon, lucideMonitor } from '@ng-icons/lucide';
import { inject, Component, ChangeDetectionStrategy } from '@angular/core';

import { ThemeStore } from '@core/services/theme-store';

import type { ThemeValue } from '@shared/models/theme-value';
import type { SelectableOption } from '@shared/models/selectable-option';

import { ButtonSelect } from '@shared/components/button-select/button-select';

@Component({
  imports: [ButtonSelect],
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitch {
  private readonly themeStore = inject(ThemeStore);

  protected readonly label = $localize`:@@theme.label:Tema`;

  protected readonly current = this.themeStore.theme;

  protected readonly options: readonly SelectableOption[] = [
    {
      value: 'system',
      label: $localize`:@@theme.system:Sistema`,
      icon: {
        kind: 'svg',
        svg: lucideMonitor,
      },
    },
    {
      value: 'light',
      label: $localize`:@@theme.light:Claro`,
      icon: {
        kind: 'svg',
        svg: lucideSun,
      },
    },
    {
      value: 'dark',
      label: $localize`:@@theme.dark:Oscuro`,
      icon: {
        kind: 'svg',
        svg: lucideMoon,
      },
    },
  ];

  protected apply(value: string): void {
    this.themeStore.setTheme(value as ThemeValue);
  }
}
