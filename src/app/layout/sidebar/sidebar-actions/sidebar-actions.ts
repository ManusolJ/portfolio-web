import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ThemeSwitch } from '@layout/sidebar/theme-switch/theme-switch';
import { LocaleSwitch } from '@layout/sidebar/locale-switch/locale-switch';

@Component({
  imports: [ThemeSwitch, LocaleSwitch],
  selector: 'app-sidebar-actions',
  templateUrl: './sidebar-actions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarActions {}
