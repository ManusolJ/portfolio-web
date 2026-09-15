import { NgComponentOutlet } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CATEGORY_LIST } from '@shared/constants/navigation';

@Component({
  imports: [NgComponentOutlet, RouterLink, RouterLinkActive],
  selector: 'app-category-list',
  templateUrl: './category-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryList {
  protected readonly categories = CATEGORY_LIST;
  protected readonly navLabel = $localize`:@@nav.label:Secciones`;
}
