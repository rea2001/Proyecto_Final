import { Component } from '@angular/core';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { OnInit,Output, EventEmitter,   } from '@angular/core';
import { Usuario } from '../Modelos/Entidades.model';
import { error } from 'node:console';

@Component({
  selector: 'app-perfil-usuarios',
  templateUrl: './perfil-usuarios.component.html',
  styleUrl: './perfil-usuarios.component.css'
})
export class PerfilUsuariosComponent  implements OnInit {

  registerFormModel: Usuario = {} as Usuario;
  profileImageUrl: string = 'https://github.com/mdo.png';

  constructor(private servicioUsuario: ServicioUsuariosService) { }

  ngOnInit() {
    // Cargar los datos del usuario al iniciar el componente
    this.loadUserData();
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict';

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.from(forms).forEach((form: any) => {
        form.addEventListener('submit', (event: any) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
    })();
  }
  
  loadUserData() {
    if (this.servicioUsuario.usuarioConectado) {
      this.registerFormModel=this.servicioUsuario.usuarioConectado
      console.log('Usuario cONECTADO')
      console.log(this.servicioUsuario.usuarioConectado)
    }
    // Llama al servicio para obtener los datos del usuario actual
    // this.servicioUsuario.getUsuarioActual()
    //   .subscribe(usuario => {
    //     // Verifica si usuario no es nulo antes de asignar los datos al modelo
    //     if (usuario) {
    //       console.log('Uusuario recibido')
    //       console.log(usuario)
    //       this.registerFormModel = new Usuario(
    //         usuario.Apellido1,
    //         usuario.Apellido2,
    //         usuario.Cedula,
    //         usuario.Contrasena,
    //         usuario.Correo,
    //         usuario.Est_Civ,
    //         usuario.Fec_Nac,
    //         usuario.Id_Usu,
    //         usuario.Nom_Usuario,
    //         usuario.Nombre1,
    //         usuario.Nombre2,
    //         usuario.Rol,
    //         usuario.Sexo,
    //         usuario.Telefono
    //       );
    //     } else {
    //       console.error('El usuario es nulo o indefinido.');
    //     }
    //   }, error => {
    //     console.error('Error al obtener los datos del usuario: ', error);
    //   });
  }

  onRegisterSubmit() {
    /* if (this.confirmPassword !== this.registerFormModel.Contrasena) {
      console.error('Las contraseñas no coinciden.');
      return;
    } */
    this.registerFormModel.Fec_Nac = '/Date(' + new Date(this.registerFormModel.Fec_Nac).getTime() + ')/';
    console.log("usuarioactualizar");
    console.log(this.registerFormModel);
    // Llama al servicio para actualizar el usuario
    this.servicioUsuario.ActualizarUsuario(this.registerFormModel)
      .subscribe(result => {
        if (result) {
          console.log('Usuario actualizado correctamente.');
          
          // Recargar los datos del usuario después de la actualización
          this.loadUserData();
        } else {
          console.error('Error al actualizar el usuario.');
        }
      }, error=>{console.log(error)}
    )} 
      
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