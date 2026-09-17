import { NgIcon } from '@ng-icons/core';
import { lucideLayers } from '@ng-icons/lucide';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Carousel } from '@shared/components/carousel/carousel';
import { TitleCard } from '@shared/components/title-card/title-card';
import {
  LANGUAGES,
  TOOL_SKILLS,
  CAPABILITIES,
  BACKEND_SKILLS,
  FRONTEND_SKILLS,
} from '@shared/constants/skills';

@Component({
  imports: [NgIcon, Carousel, TitleCard],
  selector: 'app-skills',
  templateUrl: './skills.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly icon = lucideLayers;
  protected readonly languages = LANGUAGES;
  protected readonly capabilities = CAPABILITIES;
  protected readonly stacks = [
    {
      title: $localize`:@@skills.backend:Backend`,
      technologies: BACKEND_SKILLS,
    },
    {
      title: $localize`:@@skills.frontend:Frontend`,
      technologies: FRONTEND_SKILLS,
    },
    {
      title: $localize`:@@skills.tools:Herramientas`,
      technologies: TOOL_SKILLS,
    },
  ];

  protected readonly title = $localize`:@@skills.title:Lo que sé hacer`;
  protected readonly pretitle = $localize`:@@skills.pretitle:Habilidades`;

  protected readonly languagesTitle = $localize`:@@skills.languages:Idiomas`;
  protected readonly capabilitiesLabel = $localize`:@@skills.capabilities:Capacidades`;
}
