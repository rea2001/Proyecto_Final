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
    this.http.get('http://reaavero.somee.com/SArriendos.svc/lista').subscribe(
      (data: any) => {
        const usuarioEncontrado = data.find(
          (usuario: any) =>
            usuario.Nom_Usuario === this.loginFormModel.username &&
            usuario.Contrasena === this.loginFormModel.password
        );
  
        if (usuarioEncontrado) {
          // Usuario autenticado
          console.log('Autenticación exitosa');
  
          // Verifica el rol del usuario
          if (usuarioEncontrado.Rol === 'Publicar') {
            // Redirige al componente de publicar-departamentos
            this.router.navigate(['/publicar-departamentos']);
            this.siLogeado();
          } else if (usuarioEncontrado.Rol === 'Alquilar') {
            // Redirige al componente de alquilar-departamentos
            this.router.navigate(['/alquilar-departamentos']);
            this.siLogeado();
          }
        } else {
          // Usuario no encontrado, muestra un error
          alert('Error de autenticación: Usuario o contraseña incorrectos');
          this.loginFormModel.username = '';
          this.loginFormModel.password = '';
        }
      },
      (error) => {
        // Manejar errores de la solicitud HTTP
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }
}

