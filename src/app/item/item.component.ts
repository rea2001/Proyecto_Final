import { Component, Input, OnInit } from '@angular/core';
import { Usuario, Vivienda } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Router } from '@angular/router';
import { SviviendasService } from '../sviviendas.service';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViviendaEliminarComponent } from '../Modal/modal-vivienda-eliminar/modal-vivienda-eliminar.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export class ItemComponent implements OnInit {

  constructor(private sUsuarios: ServicioUsuariosService, private ruta: Router,
     private viviendaServicio: SviviendasService, private modalService: NgbModal) { }

  @Input() vivienda!: Vivienda;
  @Input() direccionItem!: string;
  usuarioConectado!: Usuario
  imagen!: string
  @Input() esAdmin: number = 0;

  ngOnInit(): void {
    if (this.sUsuarios.usuarioConectado) {
      this.usuarioConectado = this.sUsuarios.usuarioConectado
    }
    this.viviendaServicio.retornarFotosPorIdVivienda(this.vivienda.Id_Viv).subscribe(
      fotos => { this.imagen = this.bytesAImagen(fotos[0].Foto_Com) },
      error => { console.log(error) }
    )
  }

  mostrarDepa() {
    this.esAdmin == 0 ?
      this.ruta.navigate(['/login']) :
      (this.viviendaServicio.vivendaElegida = this.vivienda, this.ruta.navigate(['/descripcionItem']))
  }

  EditarDepa() {
    this.viviendaServicio.vivendaElegida = this.vivienda
    this.viviendaServicio.estaEditando=true
    this.ruta.navigate(['/publicar-departamentos'])
  }

  openModal() {
    const modalRef = this.modalService.open(ModalViviendaEliminarComponent);
      modalRef.result.then(
      (result) => {
        if (result === 'delete') {
          // Emitir el evento para eliminar la imagen
          this.EliminarDepa();
        } else if (result === 'accept') {
          // Lógica para aceptar la imagen
        }
      },
      (reason) => {
        // Lógica para el caso de cierre del modal sin aceptar ni eliminar
      }
    );
  }

  EliminarDepa() {
    const eliminarFotosObservable = this.viviendaServicio.eliminarFotosPorIdVivienda(this.vivienda.Id_Viv);

    eliminarFotosObservable.subscribe(
      eliminado => {
        if (eliminado) {
          this.eliminarVivienda();
        } else {
          console.error('ERROR DEL SERVIDOR AL ELIMINAR FOTOS');
        }
      },
      error => {
        console.error('ERROR AL ELIMINAR FOTOS: ', error);
      }
    );
  }

  private eliminarVivienda() {
    const eliminarViviendaObservable = this.viviendaServicio.eliminarVivienda(this.vivienda.Id_Viv);

    eliminarViviendaObservable.subscribe(
      eliminado => {
        if (eliminado) {
          this.eliminarCaracteristicasServiciosCondiciones();
        } else {
          console.error('ERROR DEL SERVIDOR AL ELIMINAR VIVIENDA');
        }
      },
      error => {
        console.error('ERROR AL ELIMINAR VIVIENDA: ', error);
      }
    );
  }

  private eliminarCaracteristicasServiciosCondiciones() {
    const eliminarCaracteristicasObservable = this.viviendaServicio.eliminarCaracteristica(this.vivienda.Id_Car_Per);
    const eliminarServiciosObservable = this.viviendaServicio.eliminarServicio(this.vivienda.Id_Ser_Per);
    const eliminarCondicionesObservable = this.viviendaServicio.eliminarCondicion(this.vivienda.Id_Con_Per);

    forkJoin({
      caracteristicas: eliminarCaracteristicasObservable,
      servicios: eliminarServiciosObservable,
      condiciones: eliminarCondicionesObservable
    }).subscribe(
      (result: { caracteristicas: boolean; servicios: boolean; condiciones: boolean }) => {
        if (result.caracteristicas && result.servicios && result.condiciones) {
          console.log('Vivienda y sus detalles eliminados con éxito');
          alert('Vivienda eliminada correctamente')
          this.ruta.navigate(['/galeria'])
        } else {
          console.error('Error al eliminar características, servicios o condiciones');
          alert('La vivienda no se pudo eliminar')
        }
      },
      error => {
        console.error('Error al eliminar características, servicios o condiciones: ', error);
        alert('Ha ocurrido un error al eliminar características, servicios o condiciones');
      }
    );
  }


  //Metodo para convertir de bytes a imagen
  bytesAImagen(ima: string): string {
    // Convertir el ArrayBuffer a un Uint8Array

    let encoded = this.base64ToUint8Array(ima)
    const byteArray = new Uint8Array(encoded);

    const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Ajusta el tipo de archivo según el formato de la imagen
    //aqui se pone la imagen
    let imageUrl = URL.createObjectURL(blob);
    return imageUrl
  }


  //De base 64 a bit[]
  private base64ToUint8Array(base64String: string): Uint8Array {
    const binaryString = atob(base64String);
    const length = binaryString.length;
    const uintArray = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      uintArray[i] = binaryString.charCodeAt(i);
    }

    return uintArray;
  }



}
