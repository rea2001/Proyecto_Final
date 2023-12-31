import { Component, Input, OnInit } from '@angular/core';
import { Usuario, Vivienda } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export class ItemComponent implements OnInit {

  constructor(private sUsuarios:ServicioUsuariosService, private ruta:Router){}

  @Input() vivienda:Vivienda= new Vivienda();
  @Input() direccionItem!:string;    
  usuarioConectado!:Usuario
  @Input() esAdmin:number=0;

  ngOnInit(): void {
    // alert("hola señores")
    // this.usuarioConectado=this.sUsuarios.usuarioConectado
    // if (this.usuarioConectado) {
    //   this.esAdmin=this.usuarioConectado.Rol=='Publicar'?true:false
    // }else{
    //   this.esAdmin=true;
    // }
  }

  mostrarDepa() {
    this.esAdmin==0? this.ruta.navigate(['/login']):this.ruta.navigate(['/descripcionItem'])              
  }
}
