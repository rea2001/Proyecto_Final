import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-usuario-actualizar',
  templateUrl: './modal-usuario-actualizar.component.html',
  styleUrl: './modal-usuario-actualizar.component.css'
})
export class ModalUsuarioActualizarComponent {

  constructor(public activeModal: NgbActiveModal) {}

  actualizarUsuario() {
    this.activeModal.close('update');
  }

  cancelar() {
    this.activeModal.close('cancelar');
  }
}
