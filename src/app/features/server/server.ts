import { NgIcon } from '@ng-icons/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { lucideServer, lucideAlertTriangle } from '@ng-icons/lucide';

import { TitleCard } from '@shared/components/title-card/title-card';

@Component({
  imports: [TitleCard, NgIcon],
  selector: 'app-server',
  templateUrl: './server.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Server {
  protected readonly icon = lucideServer;

  protected readonly pretitle = $localize`:@@server.pretitle:Servidor`;
  protected readonly title = $localize`:@@server.title:Lo que he desplegado`;

  protected readonly placeholderIcon = lucideAlertTriangle;
  protected readonly placeholder = $localize`:@@server.placeholder:¡Esta función llegará más adelante, cuando el backend esté listo!`;
}
