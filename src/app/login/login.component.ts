import { Component, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() usuarioLogeado = new EventEmitter<boolean>();

  siLogeado() {
    this.usuarioLogeado.emit(true);
  }
  noLogeado() {
    this.usuarioLogeado.emit(false);
  }
  showRegistro = false;

  recibirEstado(estado: boolean) {
    this.showRegistro=estado;
  }

  // Método para mostrar el login superpuesto
  showRegistroOverlay() {
    this.showRegistro = true;
  }  

  showRegistroFalse(){
    this.showRegistro = false;
  }

  constructor(private router: Router, private http: HttpClient) {}

  loginFormModel = {
    username: '',
    password: ''
  };

  onLoginSubmit() {
    // Hacer la solicitud al servicio para obtener la lista de usuarios
    this.http.get('http://reaavero.somee.com/SArriendos.svc/lista').subscribe(
      (data: any) => {
        // Filtrar la lista para encontrar el usuario con el nombre de usuario y contraseña proporcionados
        const usuarioEncontrado = data.find(
          (usuario: any) =>
            usuario.Nom_Usuario === this.loginFormModel.username &&
            usuario.Contrasena === this.loginFormModel.password
        );

        if (usuarioEncontrado) {
          // Usuario encontrado, puedes continuar con la lógica de autenticación
          console.log('Autenticación exitosa');
          this.siLogeado();
          
        } else {
          // Usuario no encontrado, muestra un error
          alert('Error de autenticación: Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        // Manejar errores de la solicitud HTTP
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }
}
