import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

import { ServerStatusReader } from '@core/services/server-status';

import type { ServerService, ServerStatusRecord } from '@shared/models/server-status';

import { Server } from './server';

const SERVICE: ServerService = {
  name: 'portfolio-api',
  up: true,
  latencyMs: 31,
  statusCode: 200,
  checkedAt: '2026-10-05T10:00:00Z',
  uptime: { last7Days: 100, last30Days: 100, last90Days: 100 },
  days: [],
  lastIncident: null,
};

function componentWith(record: ServerStatusRecord): Server {
  TestBed.configureTestingModule({
    imports: [Server],
    providers: [{ provide: ServerStatusReader, useValue: { read: () => of(record) } }],
  });

  const fixture = TestBed.createComponent(Server);
  const component = fixture.componentInstance as unknown as {
    record: { set(value: ServerStatusRecord): void };
    dotClass(service: ServerService): string;
    dotLabel(service: ServerService): string;
  };

  component.record.set(record);

  return component as unknown as Server;
}

describe('Server', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('colours the dot by state while the server answers', () => {
    const component = componentWith({
      reachable: true,
      fetchedAt: '2026-10-05T10:00:00Z',
    }) as unknown as {
      dotClass(service: ServerService): string;
    };

    expect(component.dotClass(SERVICE)).toBe('bg-accent');
    expect(component.dotClass({ ...SERVICE, up: false })).toBe('bg-danger');
  });

  it('mutes every dot once the server is unreachable', () => {
    const component = componentWith({
      reachable: false,
      unreachableSince: '2026-10-05T10:00:00Z',
    }) as unknown as {
      dotClass(service: ServerService): string;
      dotLabel(service: ServerService): string;
    };

    expect(component.dotClass(SERVICE)).toBe('bg-muted/50');
    expect(component.dotClass({ ...SERVICE, up: false })).toBe('bg-muted/50');
    expect(component.dotLabel(SERVICE)).toBe('Última lectura conocida');
  });
});
