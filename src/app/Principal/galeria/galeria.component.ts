import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario, Vivienda } from '../../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../../servicio-usuarios.service';
import { SviviendasService } from '../../sviviendas.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit, OnDestroy{
  
  usuarioConectado!:Usuario|null
  constructor(private servicioUsuario:ServicioUsuariosService, private sViviendas:SviviendasService){}
  esAdmin=0;
  viviendas!:Vivienda[]
  
  ngOnInit(): void {
    this.cargarUsuario()
    if (this.esAdmin==0 || this.esAdmin==2) {      
      this.sViviendas.retornarTodasViviendas()
      .subscribe(
        viviendasRetornadas=>{
          this.viviendas=viviendasRetornadas
        }
      )
    }else if(this.esAdmin==1){
      //TODO: Posible error
      this.sViviendas.retornarViviendasPorIdUsuario(this.usuarioConectado?.Id_Usu?this.usuarioConectado.Id_Usu:0)
      .subscribe(
        viviendasRetornadas=>{
          this.viviendas=viviendasRetornadas
        },
        error=>{
          console.log('error al traer viviendas del admin', error)
        }
      )
    }
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
  

