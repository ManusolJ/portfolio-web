import { inject, LOCALE_ID } from '@angular/core';

import type { Locale } from '@shared/models/locale';

export function injectCurrentLocale(): Locale {
  return inject(LOCALE_ID).startsWith('en') ? 'en' : 'es';
}
