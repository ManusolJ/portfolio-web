import type { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '@env/environment';

import type { ContactMessage } from '@shared/models/contact-message';

const API_URL = environment.apiUrl + 'contact';

@Injectable({ providedIn: 'root' })
export class ContactSender {
  private readonly http = inject(HttpClient);

  sendMessage(request: ContactMessage): Observable<void> {
    return this.http.post<void>(API_URL, request);
  }
}
