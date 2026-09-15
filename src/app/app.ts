import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Dock } from '@layout/dock/dock';
import { Panel } from '@layout/panel/panel';
import { Sidebar } from '@layout/sidebar/sidebar';

@Component({
  imports: [Sidebar, Panel, Dock],
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly skipLabel = $localize`:@@a11y.skip:Saltar al contenido`;
}
