import type { ElementRef } from '@angular/core';

import { NgComponentOutlet } from '@angular/common';
import {
  input,
  output,
  computed,
  Component,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import type { SelectableOption } from '@shared/models/selectable-option';

let nextId = 0;

@Component({
  imports: [NgComponentOutlet],
  selector: 'app-button-select',
  host: { class: 'inline-block' },
  templateUrl: './button-select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSelect {
  readonly value = input<string>();
  readonly label = input.required<string>();
  readonly options = input.required<readonly SelectableOption[]>();

  readonly valueChange = output<string>();

  protected readonly menuId = `select-menu-${nextId++}`;

  private readonly menu = viewChild.required<ElementRef<HTMLElement>>('menu');
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');

  protected readonly selected = computed(
    () => this.options().find((option) => option.value === this.value()) ?? this.options()[0],
  );

  protected select(value: string): void {
    this.valueChange.emit(value);
  }

  protected reposition(): void {
    const menu = this.menu().nativeElement;
    if (!menu.matches(':popover-open')) {
      return;
    }

    const anchor = this.trigger().nativeElement.getBoundingClientRect();
    const { width, height } = menu.getBoundingClientRect();
    const gap = 6;

    const openUpwards = anchor.bottom + gap + height > window.innerHeight;
    const top = openUpwards ? anchor.top - height - gap : anchor.bottom + gap;

    menu.style.top = `${Math.max(gap, top)}px`;
    menu.style.left = `${Math.min(anchor.left, window.innerWidth - width - gap)}px`;
  }
}
