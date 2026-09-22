import type { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import type { ContactMessage } from '@shared/models/contact-message';

const API_URL = 'https://api.manusoler.dev/api/v1/contact';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  sendMessage(request: ContactMessage): Observable<ContactMessage> {
    return this.http.post<ContactMessage>(API_URL, request);
  }
}
