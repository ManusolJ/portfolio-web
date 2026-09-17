import type { ElementRef } from '@angular/core';

import { NgIcon } from '@ng-icons/core';
import { lucideChevronLeft, lucideChevronRight } from '@ng-icons/lucide';
import {
  input,
  inject,
  signal,
  Component,
  viewChild,
  DestroyRef,
  afterNextRender,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  imports: [NgIcon],
  selector: 'app-carousel',
  host: { class: 'block' },
  templateUrl: './carousel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Carousel {
  private readonly destroyRef = inject(DestroyRef);

  readonly label = input.required<string>();

  protected readonly atEnd = signal(false);
  protected readonly atStart = signal(true);

  protected readonly nextIcon = lucideChevronRight;
  protected readonly previousIcon = lucideChevronLeft;

  protected readonly nextLabel = $localize`:@@carousel.next:Siguiente`;
  protected readonly previousLabel = $localize`:@@carousel.previous:Anterior`;

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  constructor() {
    afterNextRender(() => {
      const observer = new ResizeObserver(() => this.update());
      observer.observe(this.track().nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected scroll(direction: -1 | 1): void {
    const track = this.track().nativeElement;
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
  }

  protected update(): void {
    const { scrollLeft, scrollWidth, clientWidth } = this.track().nativeElement;
    this.atStart.set(scrollLeft <= 1);
    this.atEnd.set(scrollLeft + clientWidth >= scrollWidth - 1);
  }
}
