import { lucideBot, lucideServer, lucidePencil, lucideComputer } from '@ng-icons/lucide';

import type { Interest } from '@shared/models/interest';

export const INTERESTS: readonly Interest[] = [
  {
    icon: lucideServer,
    title: $localize`:@@about.interests.homelab.title:Homelab`,
    description: $localize`:@@about.interests.homelab.description:Tengo un servidor Linux local donde despliego mis proyectos con Docker.`,
  },
  {
    icon: lucidePencil,
    title: $localize`:@@about.interests.writing.title:Escribir`,
    description: $localize`:@@about.interests.pokemon.description:Me encanta leer novelas y escribir mis propias historias.`,
  },
  {
    icon: lucideBot,
    title: $localize`:@@about.interests.ai.title:IA local`,
    description: $localize`:@@about.interests.ai.description:Cacharreo con modelos de IA en local con Ollama.`,
  },
  {
    icon: lucideComputer,
    title: $localize`:@@about.interests.programming.title:Progamación`,
    description: $localize`:@@about.interests.languages.description:Siempre estoy estudiando y repasando conceptos de diferentes lenguajes de progamación.`,
  },
];
