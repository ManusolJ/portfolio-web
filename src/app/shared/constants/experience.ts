import type { ExperienceEntry } from '@shared/models/experience-entry';

export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    url: 'https://www.convotis.com/es',
    logo: 'images/logos/convotis-logo.png',
    start: '2025-03',
    end: '2025-06',
    location: $localize`:@@experience.convotis.location:Elche, Alicante`,
    title: $localize`:@@experience.convotis.title:Desarrollador Web (Prácticas)`,
    organization: 'CONVOTIS Iberia',
    tags: ['Angular', 'TypeScript', 'RxJS', 'API REST', 'Git', 'HTML5', 'CSS3', 'Tailwind'],
    duties: [
      $localize`:@@experience.convotis.duty1:Desarrollo de aplicaciones web con Angular y TypeScript: componentes, routing, formularios y consumo de APIs REST.`,
      $localize`:@@experience.convotis.duty2:Implementación y prueba de endpoints REST, validando peticiones y respuestas con Postman.`,
      $localize`:@@experience.convotis.duty3:Trabajo con control de versiones en Git y seguimiento de las prácticas del equipo de desarrollo.`,
    ],
  },
];
