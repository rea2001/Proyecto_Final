import { Component } from '@angular/core';
import { Mensaje } from '../Modelos/Entidades.model';

@Component({
  selector: 'app-vista-mensajes',
  templateUrl: './vista-mensajes.component.html',
  styleUrl: './vista-mensajes.component.css'
})
export class VistaMensajesComponent {
  mensaje!:Mensaje
}
