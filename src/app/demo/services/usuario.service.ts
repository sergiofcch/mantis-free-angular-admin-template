import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  public listarUsuarios() {
    return this.http.get<any[]>(`${environment.urlApi}/users`);
  }

  public agregarUsuario(usuario: any) {
    return null;
    /* return this.http.post(`${this.environment.apiUrl}/usuarios`, usuario); */
  }

  public deleteUser(usuario: any) {
    return null;
    /* return this.http.delete(`${this.environment.apiUrl}/usuarios/${usuario.id}`); */
  }

  public updateUser(usuario: any) {
    return null;
    /* return this.http.put(`${this.environment.apiUrl}/usuarios/${usuario.id}`, usuario); */
  }
}
