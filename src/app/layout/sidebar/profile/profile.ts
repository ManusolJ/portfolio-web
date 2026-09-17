import { NgIcon } from '@ng-icons/core';
import { lucideDownload } from '@ng-icons/lucide';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { injectCurrentLocale } from '@shared/utils/inject-current-locale';

const CV_ESP = 'CV_Manuel_Soler_Juan.pdf';
const CV_ENG = 'CV_Manuel_Soler_Juan_ENG.pdf';

@Component({
  imports: [NgIcon],
  selector: 'app-profile',
  templateUrl: './profile.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  private readonly currentLocale = injectCurrentLocale();

  protected readonly downloadIcon = lucideDownload;
  protected readonly downloadAction = $localize`:@@nav.profile.download:Descargar CV`;
  protected readonly jobTitle = $localize`:@@nav.profile.title:Desarrollador Junior Full Stack`;

  protected readonly downloadLink = this.currentLocale === 'en' ? CV_ENG : CV_ESP;
}
