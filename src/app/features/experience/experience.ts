import { lucideBriefcase } from '@ng-icons/lucide';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EXPERIENCE } from '@shared/constants/experience';
import { TitleCard } from '@shared/components/title-card/title-card';
import { TimelineCard } from '@shared/components/timeline-card/timeline-card';

@Component({
  imports: [TitleCard, TimelineCard],
  selector: 'app-experience',
  templateUrl: './experience.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly entries = EXPERIENCE;
  protected readonly icon = lucideBriefcase;

  protected readonly pretitle = $localize`:@@experience.pretitle:Experiencia`;
  protected readonly title = $localize`:@@experience.title:Dónde he trabajado`;

  protected readonly tagsLabel = $localize`:@@experience.tags:Tecnologías`;
}
