import type { ApplicationConfig } from '@angular/core';

import { mergeApplicationConfig } from '@angular/core';
import { withRoutes, provideServerRendering } from '@angular/ssr';

import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
