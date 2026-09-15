import { RouterOutlet } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { GroupTabs } from './group-tabs/group-tabs';

@Component({
  imports: [RouterOutlet, GroupTabs],
  selector: 'app-panel',
  templateUrl: './panel.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Panel {}
