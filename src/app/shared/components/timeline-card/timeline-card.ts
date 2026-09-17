import { input, Component, ChangeDetectionStrategy } from '@angular/core';

import type { TimelineEntry } from '@shared/models/timeline-entry';

import { MonthPipe } from '@shared/pipes/month-pipe';

@Component({
  imports: [MonthPipe],
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.html',
  host: { class: 'border-line block rounded-lg border p-4 lg:p-5' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineCard {
  readonly entry = input.required<TimelineEntry>();

  protected readonly present = $localize`:@@timeline.present:Actualidad`;
}
