import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../../servicio-usuarios.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit, OnDestroy{
  
  usuarioConectado!:Usuario|null
  constructor(private servicioUsuario:ServicioUsuariosService){}
  esAdmin=0;
  
  ngOnInit(): void {
    this.cargarUsuario()
  }

  ngOnDestroy(): void {    
    // if (this.servicioUsuario.usuarioConectado && this.usuarioConectado) {
    //   this.servicioUsuario.usuarioConectado.Rol="0"

    //   console.log('entr');
    // }
    this.usuarioConectado=this.servicioUsuario.usuarioConectado;
    console.log(this.servicioUsuario.usuarioConectado?.Nombre1)
    console.log('¡La galería ha sido destruida!');
  }

  cargarUsuario(){
    this.usuarioConectado=this.servicioUsuario.usuarioConectado;
    if(this.usuarioConectado){
      this.esAdmin=this.usuarioConectado.Rol=="Publicar"?1:2
    }
  }
}
  

