import { isPlatformBrowser } from '@angular/common';
import { inject, signal, Injectable, PLATFORM_ID } from '@angular/core';

import type { ThemeValue } from '@shared/models/theme-value';

const STORAGE_KEY = 'pf-theme';

@Injectable({ providedIn: 'root' })
export class ThemeStore {
  readonly theme = signal<ThemeValue>(this.readStored());

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    if (this.isBrowser) {
      this.applyToDocument(this.theme());
    }
  }

  setTheme(next: ThemeValue): void {
    if (!this.isBrowser) {
      return;
    }

    this.applyToDocument(next);
    this.theme.set(next);
    this.persist(next);
  }

  private applyToDocument(value: ThemeValue): void {
    if (value === 'system') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', value);
    }
  }

  private readStored(): ThemeValue {
    if (!this.isBrowser) {
      return 'system';
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : 'system';
    } catch {
      return 'system';
    }
  }

  private persist(value: ThemeValue): void {
    try {
      if (value === 'system') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, value);
      }
    } catch {}
  }
}
