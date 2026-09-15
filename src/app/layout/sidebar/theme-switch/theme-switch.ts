import { LucideSun, LucideMoon, LucideMonitor } from '@lucide/angular';
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
        kind: 'lucide',
        component: LucideMonitor,
      },
    },
    {
      value: 'light',
      label: $localize`:@@theme.light:Claro`,
      icon: {
        kind: 'lucide',
        component: LucideSun,
      },
    },
    {
      value: 'dark',
      label: $localize`:@@theme.dark:Oscuro`,
      icon: {
        kind: 'lucide',
        component: LucideMoon,
      },
    },
  ];

  protected apply(value: string): void {
    this.themeStore.setTheme(value as ThemeValue);
  }
}
