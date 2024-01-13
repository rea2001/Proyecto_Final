import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ver-mensaje',
  templateUrl: './ver-mensaje.component.html',
  styleUrl: './ver-mensaje.component.css'
})
export class VerMensajeComponent implements OnInit{
  @Input() mensaje!:string
  @Output() mostrarMensaje= new EventEmitter<boolean>()
  
  ngOnInit(): void {    
  }
  cerrar() {    
    this.mostrarMensaje.emit(false)
  }
}
