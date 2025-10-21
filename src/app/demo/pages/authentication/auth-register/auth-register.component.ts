// project import
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/demo/services/auth.service';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-register',
  imports: [MatTableModule, MatStepperModule, MatInputModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss'
})
export class AuthRegisterComponent {

  public isEditable: boolean = true;

  public loginRegisterOne = new FormGroup({
    name: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    tipoDocumento: new FormControl(null, Validators.required),
    cedula: new FormControl(null, Validators.required),
    celular: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    idRol: new FormControl(2),
  });

  public loginRegisterTwo = new FormGroup({
    type: new FormControl(null, Validators.required),
    plate: new FormControl(null, Validators.required),
    trademark: new FormControl(null, Validators.required),
    model: new FormControl(null, Validators.required),
    soatExpiDate: new FormControl(null, Validators.required),
    techMechaExpiDate: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required)
  });

  public loginRegisterThree = new FormGroup({ terminos: new FormControl(null, Validators.required) });

  public vehiculosUser: any = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  protected validarCamposPrimer(stepperRegister: any) {
    if(this.loginRegisterOne.valid){
      stepperRegister.next();
    }else{
      Swal.fire({ position: "top-end", icon: "error",text: "Completar todos los campos requeridos.", showConfirmButton: false, timer: 1500 });
      this.loginRegisterOne.markAllAsTouched();
    }
  }

  protected agregarVehiculo(){
    if(this.loginRegisterTwo.valid){
      var existeVehiculo = this.vehiculosUser.filter((vehiculo) => String(vehiculo.plate.toLowerCase()) == String(this.loginRegisterTwo.value.plate.toLowerCase()));

      if(existeVehiculo.length > 0){
        Swal.fire({ position: "top-end", icon: "warning",text: "Ya existe un vehiculo registrado con la placa indicada.", showConfirmButton: false, timer: 1500 });
        this.loginRegisterTwo.reset();
      }else{ this.vehiculosUser.push(this.loginRegisterTwo.value); this.loginRegisterTwo.reset(); }

    }else{
      Swal.fire({ position: "top-end", icon: "error",text: "Completar todos los campos requeridos.", showConfirmButton: false, timer: 1500 });
      this.loginRegisterTwo.markAllAsTouched();
    }
  }

  protected deleteVehiculo(vehiculo){
    const index = this.vehiculosUser.indexOf(vehiculo);
    if (index > -1) {
      this.vehiculosUser.splice(index, 1);
    }
  }

  protected register() {
    if(this.loginRegisterOne.valid && this.loginRegisterThree.valid && this.vehiculosUser.length > 0){
      this.loginRegisterOne.patchValue({ cedula: String(this.loginRegisterOne.value.cedula) });
      var objEntity: any = this.loginRegisterOne.value;
      objEntity.vehicles = this.vehiculosUser;
      this.authService.register(objEntity).subscribe((resAuth) => {
        if(Object.keys(resAuth).length > 0){ this.getMessage("success", 'Se registro exitosamente el usuario.'); this.router.navigate(['/']);
        }else{ this.getMessage("error", 'Ocurrio un error en la api.'); }
      }, error=>{ this.getMessage("error", error.error); });
    }else{
      this.getMessage("error", "Completar todos los campos requeridos y como minimo registrar 1 vehiculo.");
      this.loginRegisterOne.markAllAsTouched();
      this.loginRegisterTwo.markAllAsTouched();
      this.loginRegisterThree.markAllAsTouched();
    }
  }

  protected getMessage(icono: any, mensaje: any){
    Swal.fire({ position: "top-end", icon: icono, title: 'Información!', text: mensaje, showConfirmButton: false, timer: 1500 });
  }
}
