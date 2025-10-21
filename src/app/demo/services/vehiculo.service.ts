import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  constructor(
    private http: HttpClient
  ) { }

  public listarVehiculos(idUsuario: number) {
    return this.http.get<any>(`${environment.urlApi}/vehicles/user/${idUsuario}`);
  }

  public guardarVehiculos(vehiculos: any, documento: string) {
    // Simulación de una llamada a un servicio para guardar los vehículos
    return null;
    //return this.http.post<any>(`${environment.apiUrl}/vehiculos`, vehiculo);
  }

}
