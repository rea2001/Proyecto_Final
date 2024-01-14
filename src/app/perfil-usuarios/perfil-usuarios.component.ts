import { Component } from '@angular/core';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { OnInit,Output, EventEmitter  } from '@angular/core';
import { Usuario } from '../Modelos/Entidades.model';

@Component({
  selector: 'app-perfil-usuarios',
  templateUrl: './perfil-usuarios.component.html',
  styleUrl: './perfil-usuarios.component.css'
})
export class PerfilUsuariosComponent implements OnInit {

  constructor(private servicioUsuario:ServicioUsuariosService) { }

  @Output() usuarioCreado = new EventEmitter<boolean>();

  siLogeado() {
    this.usuarioCreado.emit(true);
  }
  noLogeado() {
    this.usuarioCreado.emit(false);
  }

  registerFormModel: Usuario = {
    Apellido1: '',
    Apellido2: '',
    Cedula: '',
    Contrasena: '',
    Correo: '',
    Est_Civ: '',
    Fec_Nac: '', 
    Id_Usu: 0,
    Nom_Usuario: '',
    Nombre1: '',
    Nombre2: '',
    Rol: '',
    Sexo: '',
    Telefono: ''
  };  

  ngOnInit(): void {
    // Lógica de inicialización si es necesaria
  }

  onRegisterSubmit() {
    this.servicioUsuario.ActualizarUsuario(this.registerFormModel).subscribe(
      (data) => {
        if (data) {
          alert('Usuario actualizado con éxito');
          this.noLogeado();
        } else {
          alert('El usuario no se pudo actualizar');
        }
        console.log("Estado de la actualización de usuario: " + data);
      },
      (error) => {
        alert('Error al actualizar usuario: \n' + error);
      }
    );
  }
  
//foto de perfil
  profileImageUrl: string = 'https://github.com/mdo.png';

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}