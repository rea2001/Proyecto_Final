import { Component, Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-fotos',
  templateUrl: './modal-fotos.component.html',
  styleUrl: './modal-fotos.component.css'
})

export class ModalFotosComponent {
  
  @Input() image!: string;
  constructor(public activeModal: NgbActiveModal) {}

  deleteImage() {
    this.activeModal.close('delete');
  }

  acceptImage() {
    this.activeModal.close('accept');
  }
}
