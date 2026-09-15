import { computed, Component, ChangeDetectionStrategy } from '@angular/core';

import type { Locale } from '@shared/models/locale';
import type { SelectableOption } from '@shared/models/selectable-option';

import { injectRouterUrl } from '@shared/utils/inject-router-url';
import { injectCurrentLocale } from '@shared/utils/inject-current-locale';
import { ButtonSelect } from '@shared/components/button-select/button-select';

const AVAILABLE_LOCALES: readonly Locale[] = ['es', 'en'];

const LOCALE_LABELS: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

@Component({
  imports: [ButtonSelect],
  selector: 'app-locale-switch',
  templateUrl: './locale-switch.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocaleSwitch {
  private readonly path = injectRouterUrl();

  protected readonly label = $localize`:@@locale.label:Idioma`;

  protected readonly current = injectCurrentLocale();

  protected readonly options = computed<readonly SelectableOption[]>(() =>
    AVAILABLE_LOCALES.map((locale) => ({
      value: locale,
      label: LOCALE_LABELS[locale],
      icon: {
        kind: 'image',
        src: `${locale}.svg`,
      },
      href: locale === this.current ? undefined : `/${locale}${this.path()}`,
    })),
  );
}
