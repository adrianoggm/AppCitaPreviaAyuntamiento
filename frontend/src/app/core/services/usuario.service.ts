
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuario`; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) {}

  createUsuario(tramite: any): Observable<any> {

    return this.http.post<any>(this.apiUrl, tramite);
  }
  getUsuariobyNombre(nombre: string): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(`${environment.apiUrl}?nombreusuario=${nombre}`);
  }
  
}
