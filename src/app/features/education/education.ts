import { lucideGraduationCap } from '@ng-icons/lucide';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EDUCATION } from '@shared/constants/education';
import { TitleCard } from '@shared/components/title-card/title-card';
import { TimelineCard } from '@shared/components/timeline-card/timeline-card';

@Component({
  imports: [TitleCard, TimelineCard],
  selector: 'app-education',
  templateUrl: './education.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  protected readonly entries = EDUCATION;
  protected readonly icon = lucideGraduationCap;

  protected readonly pretitle = $localize`:@@education.pretitle:Educación`;
  protected readonly title = $localize`:@@education.title:Lo que he estudiado`;
}
