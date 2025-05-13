// project import
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/demo/services/auth.service';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-register',
  imports: [RouterModule, ReactiveFormsModule, MatTableModule, MatStepperModule, MatInputModule],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss'
})
export class AuthRegisterComponent {

  public isEditable: boolean = true;

  public loginRegisterOne = new FormGroup({
    nombres: new FormControl(null, Validators.required),
    apellidos: new FormControl(null, Validators.required),
    tipoDocumento: new FormControl(null, Validators.required),
    documento: new FormControl(null, Validators.required),
    celular: new FormControl(null, Validators.required),
    correo: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  public loginRegisterTwo = new FormGroup({
    tipoVehiculo: new FormControl(null, Validators.required),
    placa: new FormControl(null, Validators.required)
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
      //Swal.fire({ position: "top-end", icon: "error",title: "Completar todos los campos requeridos.", showConfirmButton: false, timer: 1500 });
      this.loginRegisterOne.markAllAsTouched();
    }
  }

  protected agregarVehiculo(){
    if(this.loginRegisterTwo.valid){
      var existeVehiculo = this.vehiculosUser.filter((vehiculo) => String(vehiculo.placa.toLowerCase()) == String(this.loginRegisterTwo.value.placa.toLowerCase()));

      if(existeVehiculo.length > 0){
        //Swal.fire({ position: "top-end", icon: "warning",title: "Ya existe un vehiculo registrado con la placa indicada.", showConfirmButton: false, timer: 1500 });
        this.loginRegisterTwo.reset();
      }else{ this.vehiculosUser.push(this.loginRegisterTwo.value); this.loginRegisterTwo.reset(); }

    }else{
      //Swal.fire({ position: "top-end", icon: "error",title: "Completar todos los campos requeridos.", showConfirmButton: false, timer: 1500 });
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
      this.authService.register(this.loginRegisterOne.value, this.vehiculosUser).subscribe((resAuth) => {
        if(resAuth.data.userExist == true){
          //Swal.fire({ position: "top-end", icon: "warning",title: "Ya se encuentra registrado el usuario.", showConfirmButton: false, timer: 1500 });
        }else{
          //Swal.fire({ position: "top-end", icon: "success",title: "Registro exitoso.", showConfirmButton: false, timer: 1500 });
          this.router.navigate(['/']);
        }
      });
    }else{
      //Swal.fire({ position: "top-end", icon: "error",title: "Completar todos los campos requeridos y como minimo registrar 1 vehiculo.", showConfirmButton: false, timer: 1500 });
      this.loginRegisterOne.markAllAsTouched();
      this.loginRegisterTwo.markAllAsTouched();
      this.loginRegisterThree.markAllAsTouched();
    }
  }
}
