import type { Routes, ResolveFn } from '@angular/router';

import { PROJECTS } from '@shared/constants/projects';

const projectOf: ResolveFn<string> = (route) =>
  PROJECTS.find((project) => project.slug === route.paramMap.get('slug'))?.name ?? '';

const projectSummaryOf: ResolveFn<string> = (route) =>
  PROJECTS.find((project) => project.slug === route.paramMap.get('slug'))?.summary ?? '';

export const routes: Routes = [
  {
    path: '',
    title: $localize`:@@seo.about.title:Desarrollador full stack junior`,
    data: {
      description: $localize`:@@seo.about.description:Manuel Soler Juan, desarrollador full stack junior en Alicante. Java, Spring Boot y Angular, con proyectos desplegados en servidor propio.`,
    },
    loadComponent: () => import('@features/about/about').then((m) => m.About),
  },
  {
    path: 'education',
    title: $localize`:@@seo.education.title:Educación`,
    data: {
      description: $localize`:@@seo.education.description:Formación de Manuel Soler Juan: Técnico Superior en Desarrollo de Aplicaciones Web y curso full stack con Angular y microservicios.`,
    },
    loadComponent: () => import('@features/education/education').then((m) => m.Education),
  },
  {
    path: 'experience',
    title: $localize`:@@seo.experience.title:Experiencia`,
    data: {
      description: $localize`:@@seo.experience.description:Experiencia profesional de Manuel Soler Juan como desarrollador web con Angular, TypeScript y APIs REST.`,
    },
    loadComponent: () => import('@features/experience/experience').then((m) => m.Experience),
  },
  {
    path: 'skills',
    title: $localize`:@@seo.skills.title:Habilidades`,
    data: {
      description: $localize`:@@seo.skills.description:Tecnologías y capacidades de Manuel Soler Juan: Java, Spring Boot, PostgreSQL, Angular, TypeScript, Docker y más.`,
    },
    loadComponent: () => import('@features/skills/skills').then((m) => m.Skills),
  },
  {
    path: 'projects',
    title: $localize`:@@seo.projects.title:Proyectos`,
    data: {
      description: $localize`:@@seo.projects.description:Proyectos de Manuel Soler Juan: un constructor de equipos Pokémon full stack, un bot de Discord con IA local y un homelab.`,
    },
    loadComponent: () => import('@features/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/:slug',
    title: projectOf,
    resolve: { description: projectSummaryOf },
    loadComponent: () =>
      import('@features/project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: 'homelab',
    title: $localize`:@@seo.homelab.title:Servidor`,
    data: {
      description: $localize`:@@seo.homelab.description:Estado en vivo del servidor casero de Manuel Soler Juan, donde se despliegan sus proyectos.`,
    },
    loadComponent: () => import('@features/server/server').then((m) => m.Server),
  },
  {
    path: 'contact',
    title: $localize`:@@seo.contact.title:Contacto`,
    data: {
      description: $localize`:@@seo.contact.description:Escribe a Manuel Soler Juan para ofertas, colaboraciones o preguntas.`,
    },
    loadComponent: () => import('@features/contact/contact').then((m) => m.Contact),
  },
  {
    path: '**',
    title: $localize`:@@seo.notFound.title:Página no encontrada`,
    loadComponent: () => import('@features/not-found/not-found').then((m) => m.NotFound),
  },
];
