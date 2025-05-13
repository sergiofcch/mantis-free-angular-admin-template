import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    /*public http: HttpClient*/
  ) { }

  public authentication(bodyLogin: any): Observable<any> {
    return null;
    /*this.http.post(`${environment.urlApi}/auth/login`, {
    documento: bodyLogin.documento, password: bodyLogin.password });*/
  }

  public register(bodyRegister: any, listaVehiculos: any): Observable<any> {
    return null;
    /*this.http.post(`${environment.urlApi}/auth/register`, {
      nombres: bodyRegister.nombres,
      apellidos: bodyRegister.apellidos,
      tipoDocumento: bodyRegister.tipoDocumento,
      documento: bodyRegister.documento,
      celular: bodyRegister.celular,
      correo: bodyRegister.correo,
      password: bodyRegister.password,
      vehiculos: bodyRegister.vehiculos
    });*/
  }

}
