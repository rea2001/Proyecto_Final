import { Component, Input, OnInit } from '@angular/core';
import { Usuario, Vivienda } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { Router } from '@angular/router';
import { SviviendasService } from '../sviviendas.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})

export class ItemComponent implements OnInit {

  constructor(private sUsuarios:ServicioUsuariosService, private ruta:Router, private viviendaServicio:SviviendasService){}

  @Input() vivienda!:Vivienda;
  @Input() direccionItem!:string;    
  usuarioConectado!:Usuario
  imagen!:string
  @Input() esAdmin:number=0;

  ngOnInit(): void {    
    if (this.sUsuarios.usuarioConectado) {
        this.usuarioConectado=this.sUsuarios.usuarioConectado      
    }
    this.viviendaServicio.retornarFotosPorIdVivienda(this.vivienda.Id_Viv).subscribe(
      fotos=>{this.imagen=this.bytesAImagen(fotos[0].Foto_Com)},
      error=>{console.log(error)}
    )
  }

  mostrarDepa() {
    this.esAdmin==0? 
    this.ruta.navigate(['/login']):
    (this.viviendaServicio.vivendaElegida=this.vivienda, this.ruta.navigate(['/descripcionItem']))
  }

//Metodo para convertir de bytes a imagen
bytesAImagen(ima:string):string {
  // Convertir el ArrayBuffer a un Uint8Array

    let encoded=this.base64ToUint8Array(ima)
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
