import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Fotos } from '../Modelos/Entidades.model';

@Component({
  selector: 'app-modal-ver-imagen',
  templateUrl: './modal-ver-imagen.component.html',
  styleUrl: './modal-ver-imagen.component.css'
})
export class ModalVerImagenComponent {
  @Input() imagenes: string[] = []
  @Input() fotos: Fotos[] = []
  @Input() eleccionImagen: number = 0
  constructor(public activeModal: NgbActiveModal) { }

  cambiarImagen(estaSiguiendo: boolean) {
    if (estaSiguiendo) {
      if (this.imagenes.length - 1 == this.eleccionImagen) {
        this.eleccionImagen = 0;
      } else {
        this.eleccionImagen++;
      }
    }
    if (!estaSiguiendo) {
      if ( this.eleccionImagen==0) {
        this.eleccionImagen = this.imagenes.length-1;
      } else {
        this.eleccionImagen--;
      }
    }
  }
  deleteImage() {
    this.activeModal.close('delete');
  }

  acceptImage() {
    this.activeModal.close('accept');
  }
}
