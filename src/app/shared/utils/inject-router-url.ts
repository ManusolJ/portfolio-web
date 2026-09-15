import type { Signal } from '@angular/core';

import { map, filter } from 'rxjs';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, NavigationEnd } from '@angular/router';

export function injectRouterUrl(): Signal<string> {
  const router = inject(Router);

  return toSignal(
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => router.url),
    ),
    { initialValue: router.url },
  );
}
