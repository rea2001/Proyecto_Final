import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-vivienda-eliminar',
  templateUrl: './modal-vivienda-eliminar.component.html',
  styleUrl: './modal-vivienda-eliminar.component.css'
})
export class ModalViviendaEliminarComponent {

  constructor(public activeModal: NgbActiveModal) {}

  eliminarVivienda() {
    this.activeModal.close('delete');
  }

  cancelar() {
    this.activeModal.close('cancelar');
  }
}
