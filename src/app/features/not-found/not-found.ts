import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { lucideCompass, lucideArrowLeft } from '@ng-icons/lucide';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TitleCard } from '@shared/components/title-card/title-card';

@Component({
  imports: [NgIcon, RouterLink, TitleCard],
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {
  protected readonly icon = lucideCompass;
  protected readonly backIcon = lucideArrowLeft;

  protected readonly back = $localize`:@@notFound.back:Volver al inicio`;
  protected readonly pretitle = $localize`:@@notFound.pretitle:Error 404`;
  protected readonly title = $localize`:@@notFound.title:Esta página no existe`;
  protected readonly body = $localize`:@@notFound.body:Puede que el enlace esté mal escrito o que la página se haya movido.`;
}
