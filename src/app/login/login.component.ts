import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private usuarioServicio:ServicioUsuariosService) { }
  
  @Output() usuarioLogeado = new EventEmitter<boolean>();
  loginFormModel = { username: '', password: ''};
  showRegistro = false;  

  siLogeado() {        
    this.usuarioLogeado.emit(true);
  }
  noLogeado() {
    this.usuarioLogeado.emit(false);
    this.router.navigate(["/home"])
  }

  recibirEstado(estado: boolean) {
    this.showRegistro = estado;
  }

  // Método para mostrar el login superpuesto
  showRegistroOverlay(e:Event) {
    this.showRegistro = true;
    e.preventDefault();
  }

  showRegistroFalse() {
    this.showRegistro = false;
  }
  
  onLoginSubmit() {
    this.usuarioServicio.LogearUsuario(this.loginFormModel.username, this.loginFormModel.password).subscribe(
      (data: Usuario) => {
        if (data) {
          // this.usuarioConectado = new Usuario(data.Apellido1, data.Apellido2, data.Cedula, data.Contrasena, data.Correo,
          //   data.Est_Civ, data.Fec_Nac, data.Id_Usu, data.Nom_Usuario, data.Nombre1, data.Nombre2, data.Rol, data.Sexo, data.Telefono);          
          this.usuarioServicio.usuarioConectado=data;          
          console.log('Autenticación exitosa');
            this.siLogeado();
            this.router.navigate(['/galeria']);
        } else {
          alert('Error de autenticación: Usuario o contraseña incorrectos');
          this.loginFormModel.username = '';
          this.loginFormModel.password = '';
        }
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    )
  }








}


