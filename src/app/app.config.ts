import type { ApplicationConfig } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { withEventReplay, provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
};
