import { NgIcon } from '@ng-icons/core';
import { of, timeout, catchError } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { lucideServer, lucideCircleAlert } from '@ng-icons/lucide';
import {
  inject,
  signal,
  Component,
  DestroyRef,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ServerStatusReader } from '@core/services/server-status';

import type { ServerDay, ServerStatusRecord } from '@shared/models/server-status';

import { TitleCard } from '@shared/components/title-card/title-card';

const REQUEST_TIMEOUT_MS = 3000;
const BYTES_PER_GIB = 1024 ** 3;

@Component({
  imports: [DatePipe, NgIcon, DecimalPipe, TitleCard],
  selector: 'app-server',
  templateUrl: './server.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Server {
  private readonly destroyRef = inject(DestroyRef);
  private readonly serverStatusReader = inject(ServerStatusReader);

  protected readonly icon = lucideServer;
  protected readonly alertIcon = lucideCircleAlert;

  protected readonly loading = signal(true);
  protected readonly record = signal<ServerStatusRecord | null>(null);

  protected readonly pretitle = $localize`:@@server.pretitle:Servidor`;
  protected readonly title = $localize`:@@server.title:Lo que he desplegado`;

  protected readonly labels = {
    cpu: $localize`:@@server.cpu:CPU`,
    load: $localize`:@@server.load:Carga`,
    disk: $localize`:@@server.disk:Disco`,
    memory: $localize`:@@server.memory:Memoria`,
    uptime: $localize`:@@server.uptime:Encendido`,
    machine: $localize`:@@server.machine:La máquina`,
    services: $localize`:@@server.services:Servicios`,
    temperature: $localize`:@@server.temperature:Temperatura`,
    loading: $localize`:@@server.loading:Consultando el servidor…`,
    noData: $localize`:@@server.noData:Sin datos todavía.`,
    up: $localize`:@@server.up:En línea`,
    down: $localize`:@@server.down:Caído`,
    uptime90: $localize`:@@server.uptime90:90 días`,
    ongoing: $localize`:@@server.ongoing:Incidencia en curso desde`,
    lastIncident: $localize`:@@server.lastIncident:Última incidencia`,
    noIncidents: $localize`:@@server.noIncidents:Sin incidencias registradas`,
    unreachable: $localize`:@@server.unreachable:No se ha podido contactar con el servidor desde`,
    measured: $localize`:@@server.measured:Medido desde Cloudflare cada 5 minutos. Última lectura:`,
  };

  constructor() {
    afterNextRender(() => {
      const subscription = this.serverStatusReader
        .read()
        .pipe(
          timeout(REQUEST_TIMEOUT_MS),
          catchError(() => of<ServerStatusRecord>({ reachable: false })),
        )
        .subscribe((record) => {
          this.record.set(record);
          this.loading.set(false);
        });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    });
  }

  protected gibibytes(bytes: number): string {
    return (bytes / BYTES_PER_GIB).toFixed(1);
  }

  protected percentOf(used: number, total: number): number {
    if (total <= 0) {
      return 0;
    }

    return Math.round((used / total) * 100);
  }

  protected days(seconds: number): number {
    return Math.floor(seconds / 86400);
  }

  protected barClass(day: ServerDay): string {
    if (day.hasGap) {
      return 'bg-muted/40';
    }

    if (day.uptime >= 99.5) {
      return 'bg-accent';
    }

    if (day.uptime >= 95) {
      return 'bg-amber-500';
    }

    return 'bg-danger';
  }
}
