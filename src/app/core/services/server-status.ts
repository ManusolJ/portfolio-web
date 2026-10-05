import type { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import type { ServerStatusRecord } from '@shared/models/server-status';

const STATUS_URL = '/api/status';

@Injectable({ providedIn: 'root' })
export class ServerStatusReader {
  private readonly http = inject(HttpClient);

  read(): Observable<ServerStatusRecord> {
    return this.http.get<ServerStatusRecord>(STATUS_URL);
  }
}
