import type { ServerRoute } from '@angular/ssr';

import { RenderMode } from '@angular/ssr';

import { PROJECTS } from '@shared/constants/projects';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projects/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve(PROJECTS.map(({ slug }) => ({ slug }))),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
