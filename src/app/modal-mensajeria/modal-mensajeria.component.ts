import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mensaje, Usuario } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { SviviendasService } from '../sviviendas.service';


@Component({
  selector: 'app-modal-mensajeria',
  templateUrl: './modal-mensajeria.component.html',
  styleUrl: './modal-mensajeria.component.css'
})
export class ModalMensajeriaComponent implements OnInit{
  usuarioConectado!:Usuario
  @Input() idPublicador!:number
  @Output() estaMostrado = new EventEmitter<boolean>();
  mensaje!:Mensaje
  constructor(private sUsuarios:ServicioUsuariosService, private Sviviendas:SviviendasService){}

  ngOnInit(): void {
    if (this.sUsuarios.usuarioConectado) {
      this.usuarioConectado = this.sUsuarios.usuarioConectado
      this.mensaje= new Mensaje(this.idPublicador, this.usuarioConectado.Id_Usu,'Me gustaría recibir más información sobre la propiedad')

    }
  }

  enviarMensaje(){
    let mensajeEnviar= `El usuario ${this.usuarioConectado.Nombre1} ${this.usuarioConectado.Apellido1} le ha gustado tu publicación ${this.Sviviendas.vivendaElegida.Nombre}.\n
                        Quiere comunicarse contigo por lo cual ha enviado sus datos: \n
                        Correo: ${this.usuarioConectado.Correo} \n
                        Telefono: ${this.usuarioConectado.Telefono}.\n
                        y le escribio: \n
                        ${this.mensaje.Mensaje_Env}`
    this.mensaje.Mensaje_Env=mensajeEnviar
    console.log(this.mensaje)
    this.sUsuarios.CrearMensaje(this.mensaje).subscribe(
      enviado=>{
        if (enviado!=null) {
          alert('Mensaje enviado con exitó')
        }
        else{
          alert('No se ha podido enviar el mensaje intentelo mas tarde')
        }
        this.estaMostrado.emit(false)
      },
      error=>{
        alert('No se envio el mensaje')
        console.log('Mensaje no enviado', error)        
      }
    )
  }
}
