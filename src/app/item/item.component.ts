import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() nombreItem!: string;
  @Input() precioItem!: Number;
  @Input() direccionItem!:string;
  @Input() tipoPropiedad!:string;
  @Input() estadoItem!:string;
}
