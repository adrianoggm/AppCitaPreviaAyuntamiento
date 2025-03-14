// src/app/core/services/tramite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class TramiteService {
  private apiUrl = `${environment.apiUrl}/tramite`; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  createTramite(tramite: any): Observable<any> {
    // El objeto 'tramite' solo contendrá 'tipoTramite'
    // El back-end se encargará de añadir: 
    // - idusuario (del usuario logueado)
    // - estado (configurado automáticamente)
    // - código (generado a partir de las 3 letras iniciales en mayúscula + número aleatorio)
    // - observaciones y documentos (cadena vacía o array vacío)
    return this.http.post<any>(this.apiUrl, tramite);
  }
}
