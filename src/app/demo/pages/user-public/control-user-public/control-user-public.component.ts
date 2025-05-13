// project import
import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/demo/services/auth.service';
import { BreadcrumbComponent } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from 'src/app/theme/layouts/admin-layout/configuration/configuration.component';
import { IconDirective, IconService } from '@ant-design/icons-angular';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { VehiculoService } from 'src/app/demo/services/vehiculo.service';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-user-public',
  imports: [CommonModule, BreadcrumbComponent, RouterModule, ConfigurationComponent, ReactiveFormsModule, IconDirective, RouterModule, NgScrollbarModule, NgbNavModule, NgbDropdownModule],
  templateUrl: './control-user-public.component.html',
  styleUrl: './control-user-public.component.scss'
})
export class ControlUserPublicComponent {

  public formVehiculo = new FormGroup({
    tipoVehiculo: new FormControl(null, Validators.required),
    placa: new FormControl(null, Validators.required)
  });

  public vehiculosUser: any = [];

  constructor(
    private vehiculosService: VehiculoService,
    private router: Router
  ) {}

  protected listarVehiculos(){
    this.vehiculosService.listarVehiculos(sessionStorage.getItem("documento")).subscribe((res) => {
      if(res.data.length > 0){
        this.vehiculosUser = res.data;
      }else{
        this.vehiculosUser = [];
      }
    });
  }

  protected agregarVehiculo(){
    if(this.formVehiculo.valid){
      var existeVehiculo = this.vehiculosUser.filter((vehiculo) => String(vehiculo.placa.toLowerCase()) == String(this.formVehiculo.value.placa.toLowerCase()));

      if(existeVehiculo.length > 0){
        //Swal.fire({ position: "top-end", icon: "warning",title: "Ya existe un vehiculo registrado con la placa indicada.", showConfirmButton: false, timer: 1500 });
        this.formVehiculo.reset();
      }else{ this.vehiculosUser.push(this.formVehiculo.value); this.formVehiculo.reset(); }

    }else{
      //Swal.fire({ position: "top-end", icon: "error",title: "Completar todos los campos requeridos.", showConfirmButton: false, timer: 1500 });
      this.formVehiculo.markAllAsTouched();
    }
  }

  protected deleteVehiculo(vehiculo){
    const index = this.vehiculosUser.indexOf(vehiculo);
    if (index > -1) {
      this.vehiculosUser.splice(index, 1);
    }
  }

  protected guardarCambios() {
    if(this.vehiculosUser.length > 0){
      this.vehiculosService.guardarVehiculos(this.vehiculosUser, sessionStorage.getItem("documento")).subscribe((res) => {
        if(res.data == true){
          //Swal.fire({ position: "top-end", icon: "success",title: "Cambios guardados.", showConfirmButton: false, timer: 1500 });
        }else{
          //Swal.fire({ position: "top-end", icon: "error",title: "Error al guardar los cambios.", showConfirmButton: false, timer: 1500 });
        }
      });
    }else{
      //Swal.fire({ position: "top-end", icon: "error",title: "Para guardar los cambios debe contar como minimo con 1 vehiculo.", showConfirmButton: false, timer: 1500 });
    }
  }

}
