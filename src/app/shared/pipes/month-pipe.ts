import { Pipe, inject, LOCALE_ID, type PipeTransform } from '@angular/core';

@Pipe({ name: 'month' })
export class MonthPipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);

  transform(value: string): string {
    const [year, month] = value.split('-').map(Number);
    if (!month) {
      return value;
    }

    return new Intl.DateTimeFormat(this.locale, { year: 'numeric', month: 'short' }).format(
      new Date(year, month - 1),
    );
  }
}
