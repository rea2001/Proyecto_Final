import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Mensaje, Usuario } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { error } from 'console';

@Component({
  selector: 'app-vista-mensajes',
  templateUrl: './vista-mensajes.component.html',
  styleUrl: './vista-mensajes.component.css'
})
export class VistaMensajesComponent implements OnInit {

  mensajes: Mensaje[] = []
  usuarioPub!: Usuario
  verMensaje: boolean = false
  mensajeElegido:string=""
  @Output() estaMostrando = new EventEmitter<boolean>()
  constructor(private sUsuarios: ServicioUsuariosService) { }

  ngOnInit(): void {
    if (this.sUsuarios.usuarioConectado) {
      this.usuarioPub = this.sUsuarios.usuarioConectado
      this.sUsuarios.retornarMensajesPorIdPub(this.usuarioPub.Id_Usu).subscribe(
        mensajes => {
          if (mensajes.length > 0) {
            this.mensajes = mensajes
            this.obtenerNombres()
          }
        },
        error => {
          console.log('Error al traer los mensajes: ', error)
        }
      )

    }
  }
  obtenerNombres() {
    this.mensajes.forEach(mensaje => {
      this.sUsuarios.ObtenerUsuarioPorId(mensaje.Id_Usu_Arr).subscribe(
        usuario => {
          if (usuario != null) {
            mensaje.nombre = `${usuario.Nombre1} ${usuario.Apellido1}`
          } else {
            console.log('Ha ocurrido un error al obtener el usuario revise el servidor');
          }
        },
        error => {
          console.log('Ha ocurrido un error al obtener el usuario', error)
        }
      )
    });
  }
  convertirFecha(fecha: string): string {
    var fechaString = "/Date(1705122000000-0500)/";
    var matchResult = fechaString.match(/\d+/);

    if (matchResult) {
      var fechaMilisegundos = parseInt(matchResult[0], 10);  // Extraer milisegundos
      var fechaConvertida = new Date(fechaMilisegundos);
      return `${fechaConvertida.getDate()}/${fechaConvertida.getMonth() + 1}`;
    } else {
      return '12/01'
    }
  }

  obtenerBool(estado: boolean) {  
    this.verMensaje=estado
    }
}
