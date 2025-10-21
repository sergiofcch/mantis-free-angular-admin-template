import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit {
  public usuarios: any = [
    // {
    //   id: 1,
    //   nombres: 'Juan',
    //   apellidos: 'Pérez',
    //   tipoDocumento: 'CC',
    //   documento: '123456789',
    //   correo: '' ,
    //   celular: '123456789',
    //   cargo: 'admin',
    //   estado: 'activo',
    //   fechaCreacion: '2023-01-01',
    //   fechaActualizacion: '2023-01-01'
    // },
    // {
    //   id: 2,
    //   nombres: 'María',
    //   apellidos: 'Gómez',
    //   tipoDocumento: 'CC',
    //   documento: '987654321',
    //   correo: '' ,
    //   celular: '987654321',
    //   cargo: 'usuario',
    //   estado: 'inactivo',
    //   fechaCreacion: '2023-01-01',
    //   fechaActualizacion: '2023-01-01'
    // }
  ];

  constructor(
    private usuariosService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  protected listarUsuarios() {
    this.usuariosService.listarUsuarios().subscribe((res) => {
      console.log(res);
      if (res.length > 0) { this.usuarios = res; }
      else { this.usuarios = []; }
    }, error => { this.getMesage("error", "Error: " + error) });
  }

  protected getMesage(icono: any, mensaje: string) {
    Swal.fire({ position: "top-end", icon: icono, title: 'Información!', text: mensaje, showConfirmButton: false, timer: 1500 });
  }

  protected addEditUser(usuario: any) {

  }

  protected deleteUser(user: any) {
    this.usuariosService.deleteUser(user).subscribe((res) => {
      if (res.status == 200) {
        this.listarUsuarios();
        //Swal.fire({ position: "top-end", icon: "success",title: "Usuario eliminado correctamente.", showConfirmButton: false, timer: 1500 });
      } else {
        //Swal.fire({ position: "top-end", icon: "error",title: "Error al eliminar el usuario.", showConfirmButton: false, timer: 1500 });
      }
    }
    );
  }

}
