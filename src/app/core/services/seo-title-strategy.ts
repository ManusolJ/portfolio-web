import type { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { TitleStrategy } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { inject, DOCUMENT, Injectable } from '@angular/core';

import { injectCurrentLocale } from '@shared/utils/inject-current-locale';
import { SITE_URL, SITE_NAME, SITE_LOCALES } from '@shared/constants/site';

const OG_IMAGE = `${SITE_URL}/og.png`;

@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly document = inject(DOCUMENT);
  private readonly locale = injectCurrentLocale();

  private readonly defaultDescription = $localize`:@@seo.default.description:Portfolio de Manuel Soler Juan, desarrollador full stack junior: Java, Spring Boot, Angular y despliegues en servidor propio.`;

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const page = this.buildTitle(snapshot);
    const path = snapshot.url.split(/[?#]/)[0] ?? '/';
    const title = page ? `${page} · ${SITE_NAME}` : SITE_NAME;
    const description = this.deepest(snapshot.root).data['description'] ?? this.defaultDescription;
    const canonical = this.urlFor(this.locale, path);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE_NAME });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    this.meta.updateTag({
      property: 'og:locale',
      content: this.locale === 'en' ? 'en_GB' : 'es_ES',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.setLink('canonical', canonical);
    for (const locale of SITE_LOCALES) {
      this.setLink('alternate', this.urlFor(locale, path), locale);
    }
    this.setLink('alternate', this.urlFor('es', path), 'x-default');
  }

  private deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    return route.firstChild ? this.deepest(route.firstChild) : route;
  }

  private urlFor(locale: string, path: string): string {
    const suffix = path === '/' ? '/' : `${path}/`;

    return `${SITE_URL}/${locale}${suffix}`;
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.rel = rel;
      if (hreflang) {
        link.hreflang = hreflang;
      }
      this.document.head.appendChild(link);
    }

    link.href = href;
  }
}
