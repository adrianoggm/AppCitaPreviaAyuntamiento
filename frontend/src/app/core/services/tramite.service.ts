// src/app/core/services/tramite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  private apiUrl = `${environment.apiUrl}/tramite`; // Ajusta la URL según el endpoint en tu backend

  constructor(private http: HttpClient) {}

  createTramite(tramite: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, tramite);
  }
}
