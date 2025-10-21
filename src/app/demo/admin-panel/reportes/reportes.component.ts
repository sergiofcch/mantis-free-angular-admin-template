import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'app-reportes',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {

  public formReporte = new FormGroup({
    type: new FormControl(null, Validators.required)
  });

  public historicos: any = []

  constructor(
    private registroService: RegistrosService
  ) { }

  protected generarReporte() {
    if(this.formReporte.valid){
      this.registroService[String(this.formReporte.value.type)]().subscribe((res) => {
        console.log(res);
        if (res.length > 0) { this.historicos = res; }
        else { this.historicos = []; }
      }, error => { this.getMesage("error", "Error: " + error) });
    }else{ this.getMesage("error", "Error: Debe seleccionar un tipo de reporte"); }
  }

  protected getMesage(icono: any, mensaje: string) {
    Swal.fire({ position: "top-end", icon: icono, title: 'Información!', text: mensaje, showConfirmButton: false, timer: 1500 });
  }

}
