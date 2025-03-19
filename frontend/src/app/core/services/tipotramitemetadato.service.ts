import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 
@Injectable({
  providedIn: 'root'
})
export class TipotramiteMetadatoService {
    private apiUrl = `${environment.apiUrl}/tipotramitemetadato`;

  constructor(private http: HttpClient) {}

  getTemplateByNombre(nombre: string): Observable<any> {
    const url = `${this.apiUrl}?nombre=${encodeURIComponent(nombre)}`;
    return this.http.get<any>(url);
  }
}
