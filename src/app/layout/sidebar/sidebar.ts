import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Profile } from './profile/profile';
import { CategoryList } from './category-list/category-list';
import { SidebarActions } from './sidebar-actions/sidebar-actions';

@Component({
  imports: [Profile, CategoryList, SidebarActions],
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {}
