import type { ApplicationConfig } from '@angular/core';

import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { withEventReplay, provideClientHydration } from '@angular/platform-browser';
import { TitleStrategy, provideRouter, withComponentInputBinding } from '@angular/router';

import { SeoTitleStrategy } from '@core/services/seo-title-strategy';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideRouter(routes, withComponentInputBinding()),
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
  ],
};
