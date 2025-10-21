import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public http: HttpClient
  ) { }

  public authentication(bodyLogin: any): Observable<any> {
    return null;
    /*this.http.post(`${environment.urlApi}/auth/login`, {
    documento: bodyLogin.documento, password: bodyLogin.password });*/
  }

  public register(bodyRegister: any): Observable<any> {
    return this.http.post(`${environment.urlApi}/users`, bodyRegister);
  }

}
