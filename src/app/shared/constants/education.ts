import type { TimelineEntry } from '@shared/models/timeline-entry';

export const EDUCATION: readonly TimelineEntry[] = [
  {
    url: 'https://portal.edu.gva.es/03013224/',
    end: '2025',
    logo: 'images/logos/severo-ochoa-logo.png',
    start: '2023',
    title: $localize`:@@education.daw.title:Técnico Superior en Desarrollo de Aplicaciones Web`,
    summary: $localize`:@@education.daw.summary:Ciclo de grado superior centrado en Java, bases de datos relacionales y desarrollo web con Angular, con prácticas en empresa en el último tramo.`,
    organization: 'IES Severo Ochoa',
  },
  {
    url: 'https://www.eoi.es/',
    end: '2024',
    logo: 'images/logos/eoi-logo.png',
    start: '2024',
    title: $localize`:@@education.eoi.title:Curso de Programación Full Stack con Angular y Microservicios`,
    summary: $localize`:@@education.eoi.summary:Curso intensivo de desarrollo full stack: Angular en el frontend y arquitectura de microservicios en el backend.`,
    organization: 'Escuela de Organización Industrial',
  },
];
