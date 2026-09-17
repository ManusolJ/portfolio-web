import {
  lucideCode,
  lucideRocket,
  lucideDatabase,
  lucidePaintbrush,
  lucideLockKeyhole,
} from '@ng-icons/lucide';
import {
  diGitOriginal,
  diJavaOriginal,
  diCss3Original,
  diHtml5Original,
  diDockerOriginal,
  diSpringOriginal,
  diSqliteOriginal,
  diAngularOriginal,
  diPostmanOriginal,
  diPostgresqlOriginal,
  diTypescriptOriginal,
  diTailwindcssOriginal,
  diGithubactionsOriginal,
} from '@ng-icons/devicon/original';

import type { Language } from '@shared/models/language';
import type { Capability } from '@shared/models/capability';
import type { Technology } from '@shared/models/technology';

export const CAPABILITIES: readonly Capability[] = [
  {
    icon: lucideCode,
    name: $localize`:@@skills.api.name:APIs REST`,
    summary: $localize`:@@skills.api.summary:Diseño y construyo servicios REST con Spring Boot, con validación, paginación y documentación.`,
  },
  {
    icon: lucideDatabase,
    name: $localize`:@@skills.database.name:Bases de datos`,
    summary: $localize`:@@skills.database.summary:Modelo esquemas relacionales, escribo SQL y gestiono migraciones versionadas.`,
  },
  {
    icon: lucideLockKeyhole,
    name: $localize`:@@skills.auth.name:Autenticación`,
    summary: $localize`:@@skills.auth.summary:Sistemas de registro y sesión con Spring Security y JWT, incluyendo rutas protegidas en el frontend.`,
  },
  {
    icon: lucidePaintbrush,
    name: $localize`:@@skills.design.name:Interfaces web`,
    summary: $localize`:@@skills.design.summary:Interfaces responsivas y accesibles con Angular y Tailwind, con tema claro y oscuro.`,
  },
  {
    icon: lucideRocket,
    name: $localize`:@@skills.deploy.name:Despliegue`,
    summary: $localize`:@@skills.deploy.summary:Contenedores Docker, CI con GitHub Actions y despliegue en servidor Linux propio.`,
  },
];

export const BACKEND_SKILLS: readonly Technology[] = [
  {
    icon: diJavaOriginal,
    name: 'Java',
  },
  {
    icon: diSpringOriginal,
    name: 'Spring Boot',
  },
  {
    icon: diPostgresqlOriginal,
    name: 'PostgreSQL',
  },
  {
    icon: diSqliteOriginal,
    name: 'SQLite',
  },
];

export const FRONTEND_SKILLS: readonly Technology[] = [
  {
    icon: diAngularOriginal,
    name: 'Angular',
  },
  {
    icon: diTypescriptOriginal,
    name: 'TypeScript',
  },
  {
    icon: diHtml5Original,
    name: 'HTML5',
  },
  {
    icon: diCss3Original,
    name: 'CSS3',
  },
  {
    icon: diTailwindcssOriginal,
    name: 'Tailwind CSS',
  },
];

export const TOOL_SKILLS: readonly Technology[] = [
  {
    icon: diGitOriginal,
    name: 'Git',
  },
  {
    icon: diGithubactionsOriginal,
    name: 'GitHub Actions',
  },
  {
    icon: diDockerOriginal,
    name: 'Docker',
  },
  {
    icon: diPostmanOriginal,
    name: 'Postman',
  },
];

export const LANGUAGES: readonly Language[] = [
  {
    image: 'images/flags/es.svg',
    name: $localize`:@@skills.languages.spanish.name:Español`,
    level: $localize`:@@skills.languages.spanish.level:Lengua materna`,
    summary: $localize`:@@skills.languages.spanish.summary:Comunicación oral y escrita a nivel profesional.`,
  },
  {
    image: 'images/flags/en.svg',
    name: $localize`:@@skills.languages.english.name:Inglés`,
    level: $localize`:@@skills.languages.english.level:C1 certificado (EF SET)`,
    summary: $localize`:@@skills.languages.english.summary:Conversación y escritura fluidas; cómodo en entornos de trabajo en inglés.`,
  },
  {
    image: 'images/flags/ct.svg',
    name: $localize`:@@skills.languages.valencian.name:Valenciano`,
    level: $localize`:@@skills.languages.valencian.level:A2`,
    summary: $localize`:@@skills.languages.valencian.summary:Nivel básico.`,
  },
];
