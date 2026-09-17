import { NgIcon } from '@ng-icons/core';
import { input, Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  imports: [NgIcon],
  host: { class: 'block' },
  selector: 'app-title-card',
  templateUrl: './title-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleCard {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly pretitle = input.required<string>();
}
