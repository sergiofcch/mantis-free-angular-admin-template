import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {
  public usuarios: any = [
    {
      id: 1,
      nombres: 'Juan',
      apellidos: 'Pérez',
      tipoDocumento: 'CC',
      documento: '123456789',
      correo: '' ,
      celular: '123456789',
      cargo: 'admin',
      estado: 'activo',
      fechaCreacion: '2023-01-01',
      fechaActualizacion: '2023-01-01'
    },
    {
      id: 2,
      nombres: 'María',
      apellidos: 'Gómez',
      tipoDocumento: 'CC',
      documento: '987654321',
      correo: '' ,
      celular: '987654321',
      cargo: 'usuario',
      estado: 'inactivo',
      fechaCreacion: '2023-01-01',
      fechaActualizacion: '2023-01-01'
    }
  ];

  constructor(
    private usuariosService: UsuarioService
  ) {}

  protected listarUsuarios() {
    this.usuariosService.listarUsuarios().subscribe((res) => {
      if (res.data.length > 0) {
        this.usuarios = res.data;
      } else {
        this.usuarios = [];
      }
    });
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
