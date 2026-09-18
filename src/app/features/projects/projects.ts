import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { tablerBrandGithub } from '@ng-icons/tabler-icons';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { lucideGrid2x2, lucideArrowRight, lucideExternalLink } from '@ng-icons/lucide';

import { PROJECTS } from '@shared/constants/projects';
import { TitleCard } from '@shared/components/title-card/title-card';

@Component({
  imports: [NgIcon, RouterLink, TitleCard],
  selector: 'app-projects',
  templateUrl: './projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly projects = PROJECTS;
  protected readonly icons = {
    grid: lucideGrid2x2,
    arrow: lucideArrowRight,
    github: tablerBrandGithub,
    external: lucideExternalLink,
  };

  protected readonly pretitle = $localize`:@@projects.pretitle:Proyectos`;
  protected readonly title = $localize`:@@projects.title:Lo que he construido`;

  protected readonly repoLabel = $localize`:@@projects.repo:Código`;
  protected readonly demoLabel = $localize`:@@projects.demo:Demo`;
  protected readonly tagsLabel = $localize`:@@projects.tags:Tecnologías`;
  protected readonly detailLabel = $localize`:@@projects.detail:Ver proyecto`;
}
