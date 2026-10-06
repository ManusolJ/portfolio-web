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

import type { ServerDay, ServerService, ServerStatusRecord } from '@shared/models/server-status';

import { TitleCard } from '@shared/components/title-card/title-card';

const BAR_COUNT = 90;
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
    sinceStart: $localize`:@@server.sinceStart:Desde el inicio`,
    noDay: $localize`:@@server.noDay:Sin datos`,
    partialDay: $localize`:@@server.partialDay:Datos incompletos`,
    ongoing: $localize`:@@server.ongoing:Incidencia en curso desde`,
    lastIncident: $localize`:@@server.lastIncident:Última incidencia`,
    noIncidents: $localize`:@@server.noIncidents:Sin incidencias registradas`,
    lastKnown: $localize`:@@server.lastKnown:Última lectura conocida`,
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

  protected dotClass(service: ServerService): string {
    if (!this.record()?.reachable) {
      return 'bg-muted/50';
    }

    return service.up ? 'bg-accent' : 'bg-danger';
  }

  protected dotLabel(service: ServerService): string {
    if (!this.record()?.reachable) {
      return this.labels.lastKnown;
    }

    return service.up ? this.labels.up : this.labels.down;
  }

  protected barsOf(service: ServerService): readonly (ServerDay | null)[] {
    const byDay = new Map(service.days.map((day) => [day.day, day]));
    const today = new Date();

    return Array.from({ length: BAR_COUNT }, (unused, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (BAR_COUNT - 1 - index));

      return byDay.get(date.toISOString().slice(0, 10)) ?? null;
    });
  }

  protected barClass(day: ServerDay | null): string {
    if (day === null) {
      return 'bg-line/60';
    }

    const tone = day.uptime >= 99.5 ? 'bg-accent' : day.uptime >= 95 ? 'bg-amber-500' : 'bg-danger';

    return day.hasGap ? `${tone} opacity-40` : tone;
  }

  protected barTitle(day: ServerDay | null): string {
    if (day === null) {
      return this.labels.noDay;
    }

    return `${day.day} · ${day.uptime.toFixed(2)}%${day.hasGap ? ` · ${this.labels.partialDay}` : ''}`;
  }

  protected windowLabel(service: ServerService): string {
    return service.days.length >= BAR_COUNT ? this.labels.uptime90 : this.labels.sinceStart;
  }
}
