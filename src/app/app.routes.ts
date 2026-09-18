import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/about/about').then((m) => m.About),
  },
  {
    path: 'education',
    loadComponent: () => import('@features/education/education').then((m) => m.Education),
  },
  {
    path: 'experience',
    loadComponent: () => import('@features/experience/experience').then((m) => m.Experience),
  },
  {
    path: 'skills',
    loadComponent: () => import('@features/skills/skills').then((m) => m.Skills),
  },
  {
    path: 'projects',
    loadComponent: () => import('@features/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/:slug',
    loadComponent: () =>
      import('@features/project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: 'homelab',
    loadComponent: () => import('@features/server/server').then((m) => m.Server),
  },
  {
    path: 'contact',
    loadComponent: () => import('@features/contact/contact').then((m) => m.Contact),
  },
];
