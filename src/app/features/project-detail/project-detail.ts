import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { tablerBrandGithub } from '@ng-icons/tabler-icons';
import { input, computed, Component, ChangeDetectionStrategy } from '@angular/core';
import { lucideGrid2x2, lucideArrowLeft, lucideExternalLink } from '@ng-icons/lucide';

import { PROJECTS } from '@shared/constants/projects';
import { TitleCard } from '@shared/components/title-card/title-card';

@Component({
  imports: [NgIcon, RouterLink, TitleCard],
  selector: 'app-project-detail',
  templateUrl: './project-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetail {
  readonly slug = input.required<string>();

  protected readonly icons = {
    grid: lucideGrid2x2,
    back: lucideArrowLeft,
    github: tablerBrandGithub,
    external: lucideExternalLink,
  };

  protected readonly project = computed(() =>
    PROJECTS.find((project) => project.slug === this.slug()),
  );

  protected readonly pretitle = $localize`:@@projects.detail.pretitle:Proyecto`;

  protected readonly repoLabel = $localize`:@@projects.repo:Código`;
  protected readonly demoLabel = $localize`:@@projects.demo:Demo`;
  protected readonly tagsLabel = $localize`:@@projects.tags:Tecnologías`;
  protected readonly backLabel = $localize`:@@projects.detail.back:Todos los proyectos`;
  protected readonly missing = $localize`:@@projects.detail.missing:Este proyecto no existe.`;
}
