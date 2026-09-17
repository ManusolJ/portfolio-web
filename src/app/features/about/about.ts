import { NgIcon } from '@ng-icons/core';
import { RouterLink } from '@angular/router';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { tablerBrandGithub, tablerBrandLinkedin } from '@ng-icons/tabler-icons';
import { lucideMail, lucideHand, lucideMapPin, lucideArrowRight } from '@ng-icons/lucide';

import { INTERESTS } from '@shared/constants/interests';
import { TitleCard } from '@shared/components/title-card/title-card';

@Component({
  imports: [NgIcon, RouterLink, TitleCard],
  selector: 'app-about',
  templateUrl: './about.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  protected readonly interests = INTERESTS;
  protected readonly icons = {
    hand: lucideHand,
    mail: lucideMail,
    mapPin: lucideMapPin,
    arrow: lucideArrowRight,
    github: tablerBrandGithub,
    linkedin: tablerBrandLinkedin,
  };

  protected readonly pretitle = $localize`:@@about.pretitle:Hola, soy Manuel`;
  protected readonly title = $localize`:@@about.title:Desarrollador full stack junior`;

  protected readonly contactLabel = $localize`:@@about.contact.label:Contacto`;

  protected readonly bioTitle = $localize`:@@about.bio.title:Un poco sobre mí`;
  protected readonly bio: readonly string[] = [
    $localize`:@@about.bio.p1:Me muevo con soltura entre el backend y el frontend, pero donde más disfruto es en el lado del servidor: modelar bases de datos, montar sistemas de autenticación y llevar cada proyecto hasta el despliegue.`,
    $localize`:@@about.bio.p2:Trabajo sobre todo con Java y Spring Boot en el backend y Angular con TypeScript en el frontend, con PostgreSQL, Docker y Linux de por medio.`,
    $localize`:@@about.bio.p3:Todavía me queda mucho por aprender, y precisamente por eso busco un equipo con gente que sepa más que yo. Si crees que encajo en el tuyo, escríbeme.`,
  ];
  protected readonly cta = $localize`:@@about.cta:Contáctame`;

  protected readonly interestsTitle = $localize`:@@about.interests.title:Intereses personales`;
}
