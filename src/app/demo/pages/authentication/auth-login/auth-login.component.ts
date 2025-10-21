// project import
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/demo/services/auth.service';
import Swal from 'sweetalert2';
//import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  
  protected loginForm = new FormGroup({
    documento: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(
    protected authService: AuthService,
    protected router: Router
  ) {}

  protected authentication() {

    if(this.loginForm.valid){
      if(this.loginForm.value.documento == '1075254304' && this.loginForm.value.password == '1075254304'){
        sessionStorage.setItem('user', this.loginForm.value.documento);
        this.router.navigate(['/admin']);
      }else if(this.loginForm.value.documento == '123456' && this.loginForm.value.password == '123456'){
        sessionStorage.setItem('user', this.loginForm.value.documento);
        this.router.navigate(['/user-public']);
      }else{
        Swal.fire({ position: "top-end", icon: "warning",text: "Usuario o contraseña incorrecta.", showConfirmButton: false, timer: 1500 });
        this.loginForm.reset();
      }

      // this.authService.authentication(this.loginForm.value).subscribe((resAuth) => {
      //   if (resAuth.data.documento == true) {
      //     if(resAuth.data.clave == true){
      //       sessionStorage.setItem('user', this.loginForm.value.documento);
      //       if(resAuth.data.rol == 'admin'){
      //         this.router.navigate(['/admin']);
      //       }else if(resAuth.data.rol == 'user'){
      //         this.router.navigate(['/user-public']);
      //       }
      //     }else{ 
      //       //Swal.fire({ position: "top-end", icon: "warning",title: "Contraseña Incorrecta.", showConfirmButton: false, timer: 1500 });
      //     }
      //   } else {
      //     //Swal.fire({ position: "top-end", icon: "warning",title: "No se encontro ningun usuario registrado con el documento indicado.", showConfirmButton: false, timer: 1500 });
      //     this.loginForm.reset();
      //   }
      // });
    }else{
      //Swal.fire({ position: "top-end", icon: "error",title: "Completar todos los campos requeridos.", showConfirmButton: false, timer: 1500 });
      this.loginForm.markAllAsTouched();
    }


  }
}
