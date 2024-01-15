import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-vivienda',
  templateUrl: './modal-vivienda.component.html',
  styleUrl: './modal-vivienda.component.css'
})
export class ModalViviendaComponent {

  constructor(public activeModal: NgbActiveModal) {}

  actualizarVivienda() {
    this.activeModal.close('update');
  }

  cancelar() {
    this.activeModal.close('cancelar');
  }
}
