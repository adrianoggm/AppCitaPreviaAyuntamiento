import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  // Usamos la URL base de la API desde el entorno y completamos el endpoint
  private apiUrl = `${environment.apiUrl}/cita/dias-disponibles`;

  constructor(private http: HttpClient) {}

  getDiasDisponibles(tipoTramite: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}?tipoTramite=${tipoTramite}`);
  }
}
