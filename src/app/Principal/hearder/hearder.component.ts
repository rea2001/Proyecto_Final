import { Component } from '@angular/core';
import { ServicioUsuariosService } from '../../servicio-usuarios.service';
import { Router } from '@angular/router';
import { SviviendasService } from '../../sviviendas.service';


@Component({
  selector: 'app-hearder',
  templateUrl: './hearder.component.html',
  styleUrl: './hearder.component.css'
})
export class HearderComponent {

  constructor(protected usuarioServicio: ServicioUsuariosService, protected ruta: Router, protected viviendaServicio: SviviendasService) { }
  isLoggedIn = this.usuarioServicio.verificaSesion();
  showLogin = false;
  esAdmin = this.usuarioServicio.esAdmin;
  estaMostrando=false

  recibirEstado(estado: boolean) {
    this.isLoggedIn = estado;
    this.usuarioServicio.crearSesion(estado)
    this.showLogin = false;
    this.usuarioServicio.mostrarLogin=false
    this.esAdmin = this.usuarioServicio.esAdmin;
    // if (this.usuarioServicio.usuarioConectado) {
    //   if (this.usuarioServicio.usuarioConectado.Rol == 'Publicar') {

    //   }                
    // }
  }
  cerrarSesion() {
    this.isLoggedIn = false;
    this.usuarioServicio.cerrarSesion()
    this.esAdmin = this.usuarioServicio.esAdmin;
    this.ruta.navigate(['/home'])
  }

  // Método para mostrar el login superpuesto
  showLoginOverlay() {
    this.showLogin = true;
    this.usuarioServicio.mostrarLogin=true    
  }
  mostrarMensajes() {
    this.estaMostrando=true;    
  }

}
