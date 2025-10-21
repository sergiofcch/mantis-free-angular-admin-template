import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(
    private http: HttpClient
  ) { }

  public listarHistoricos() {
    return this.http.get<any[]>(`${environment.urlApi}/entry-registrations/details`);
  }

  public listarDiario() {
    return this.http.get<any[]>(`${environment.urlApi}/entry-registrations/details/today`);
  }
}
