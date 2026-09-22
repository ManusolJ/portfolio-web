import type { AbstractControl } from '@angular/forms';
import type { HttpErrorResponse } from '@angular/common/http';

import { NgIcon } from '@ng-icons/core';
import { lucideMail, lucideSend } from '@ng-icons/lucide';
import { inject, signal, Component, ChangeDetectionStrategy } from '@angular/core';
import { Validators, ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';

import { ContactService } from '@core/services/contact';

import { CONTACT_EMAIL } from '@shared/constants/contact';
import { TitleCard } from '@shared/components/title-card/title-card';

const LIMITS = {
  nameMax: 80,
  emailMax: 254,
  messageMin: 20,
  subjectMax: 120,
  messageMax: 2000,
};

@Component({
  imports: [NgIcon, TitleCard, ReactiveFormsModule],
  selector: 'app-contact',
  templateUrl: './contact.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly contactService = inject(ContactService);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly limits = LIMITS;
  protected readonly icon = lucideMail;
  protected readonly sendIcon = lucideSend;
  protected readonly sending = signal(false);
  protected readonly submitted = signal(false);
  protected readonly failure = signal<string | null>(null);

  protected readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(LIMITS.nameMax)]],
    subject: ['', [Validators.required, Validators.maxLength(LIMITS.subjectMax)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(LIMITS.emailMax)]],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(LIMITS.messageMin),
        Validators.maxLength(LIMITS.messageMax),
      ],
    ],
    website: [''],
  });

  protected readonly title = $localize`:@@contact.title:Hablemos`;
  protected readonly pretitle = $localize`:@@contact.pretitle:Contacto`;
  protected readonly intro = $localize`:@@contact.intro:¿Tienes una oferta, una pregunta o un proyecto en mente? Escríbeme y te responderé a la dirección que indiques.`;

  protected readonly labels = {
    name: $localize`:@@contact.name:Nombre`,
    subject: $localize`:@@contact.subject:Asunto`,
    message: $localize`:@@contact.message:Mensaje`,
    send: $localize`:@@contact.send:Enviar mensaje`,
    email: $localize`:@@contact.email:Correo electrónico`,
    fallback: $localize`:@@contact.fallback:Si prefieres, escríbeme directamente a`,
    sending: $localize`:@@contact.sending:Enviando…`,
    sent: $localize`:@@contact.sent:Mensaje enviado. Te responderé lo antes posible.`,
  };

  protected readonly errors: Record<string, string> = {
    required: $localize`:@@contact.error.required:Este campo es obligatorio.`,
    maxlength: $localize`:@@contact.error.maxlength:Has superado la longitud máxima.`,
    email: $localize`:@@contact.error.email:Introduce una dirección de correo válida.`,
    minlength: $localize`:@@contact.error.minlength:El mensaje debe tener al menos ${LIMITS.messageMin}:min: caracteres.`,
  };

  protected readonly failures = {
    generic: $localize`:@@contact.failure.generic:No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbeme directamente.`,
    rateLimit: $localize`:@@contact.failure.rateLimit:Has enviado demasiados mensajes. Inténtalo de nuevo más tarde.`,
  };

  protected readonly contactEmail = CONTACT_EMAIL;

  protected errorOf(control: AbstractControl): string | null {
    if (!control.touched || !control.errors) {
      return null;
    }

    const [key] = Object.keys(control.errors);

    return this.errors[key] ?? this.errors['required'];
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { website, ...message } = this.form.getRawValue();

    if (website) {
      this.submitted.set(true);
      return;
    }

    this.failure.set(null);
    this.sending.set(true);

    this.contactService.sendMessage(message).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
        this.form.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.sending.set(false);
        this.failure.set(error.status === 429 ? this.failures.rateLimit : this.failures.generic);
      },
    });
  }
}
