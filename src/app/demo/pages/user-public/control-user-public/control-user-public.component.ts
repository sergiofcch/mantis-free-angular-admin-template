// project import
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from 'src/app/theme/layouts/admin-layout/configuration/configuration.component';
import { IconDirective } from '@ant-design/icons-angular';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { VehiculoService } from 'src/app/demo/services/vehiculo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-user-public',
  imports: [CommonModule, BreadcrumbComponent, RouterModule, ConfigurationComponent, ReactiveFormsModule, IconDirective, RouterModule, NgScrollbarModule, NgbNavModule, NgbDropdownModule],
  templateUrl: './control-user-public.component.html',
  styleUrl: './control-user-public.component.scss'
})
export class ControlUserPublicComponent implements OnInit {

  public formVehiculo = new FormGroup({
    type: new FormControl(null, Validators.required),
    plate: new FormControl(null, Validators.required),
    trademark: new FormControl(null, Validators.required),
    model: new FormControl(null, Validators.required),
    soatExpiDate: new FormControl(null, Validators.required),
    techMechaExpiDate: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required)
  });

  public vehiculosUser: any = [];

  constructor(
    private vehiculosService: VehiculoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarVehiculos();
  }

  protected listarVehiculos() {
    this.vehiculosService.listarVehiculos(1).subscribe((res) => {
      if (res.length > 0) { this.vehiculosUser = res; }
      else { this.vehiculosUser = []; }
    }, error => { this.getMesage("error", "Error: " + error) });
  }

  protected agregarVehiculo() {
    if (this.formVehiculo.valid) {
      var existeVehiculo = this.vehiculosUser.filter((vehiculo) => String(vehiculo.plate.toLowerCase()) == String(this.formVehiculo.value.plate.toLowerCase()));

      if (existeVehiculo.length > 0) {
        //Swal.fire({ position: "top-end", icon: "warning",title: "Ya existe un vehiculo registrado con la placa indicada.", showConfirmButton: false, timer: 1500 });
        this.formVehiculo.reset();
      } else { this.vehiculosUser.push(this.formVehiculo.value); this.formVehiculo.reset(); }

    } else {
      //Swal.fire({ position: "top-end", icon: "error",title: "Completar todos los campos requeridos.", showConfirmButton: false, timer: 1500 });
      this.formVehiculo.markAllAsTouched();
    }
  }

  protected deleteVehiculo(vehiculo) {
    const index = this.vehiculosUser.indexOf(vehiculo);
    if (index > -1) {
      this.vehiculosUser.splice(index, 1);
    }
  }

  protected guardarCambios() {
    if (this.vehiculosUser.length > 0) {
      this.vehiculosService.guardarVehiculos(this.vehiculosUser, sessionStorage.getItem("documento")).subscribe((res) => {
        if (res.data == true) {
          //Swal.fire({ position: "top-end", icon: "success",title: "Cambios guardados.", showConfirmButton: false, timer: 1500 });
        } else {
          //Swal.fire({ position: "top-end", icon: "error",title: "Error al guardar los cambios.", showConfirmButton: false, timer: 1500 });
        }
      });
    } else {
      //Swal.fire({ position: "top-end", icon: "error",title: "Para guardar los cambios debe contar como minimo con 1 vehiculo.", showConfirmButton: false, timer: 1500 });
    }
  }

  protected getMesage(icono: any, mensaje: string) {
    Swal.fire({ position: "top-end", icon: icono, title: 'Información!', text: mensaje, showConfirmButton: false, timer: 1500 });
  }

  protected logout(){
    sessionStorage.removeItem('user');
    this.router.navigate(['/']);
  }

}
