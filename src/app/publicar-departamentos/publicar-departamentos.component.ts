/// <reference types="@types/google.maps" />

import { Component, ViewChild } from '@angular/core';
import { Vivienda, Usuario, Caracteristicas, Servicios, Condiciones, Fotos } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';

@Component({
  selector: 'app-publicar-departamentos',
  templateUrl: './publicar-departamentos.component.html',
  styleUrl: './publicar-departamentos.component.css'
})
export class PublicarDepartamentosComponent {

  constructor(private servicioUsuario:ServicioUsuariosService){}
  
  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;
  marker!: google.maps.Marker;  
  imagenes: string[] = [];
  usuarioPertenece:Usuario|null=this.servicioUsuario.usuarioConectado  
  imageUrl: string | ArrayBuffer | null = null;  
  fileBytes: Uint8Array | undefined;

  condicioCrear:Condiciones={
    Id_Con:0,
    Fiestas:false,
    Garantia:0,
    Mascotas:false,
    Num_Pers:0
  }
  serviCrear:Servicios={
    Id_Ser:0,
    Luz:false,
    Agua:false,
    Internet:false,
    Garaje:false,
    Telefono:false,
    Calefon:false,
    Duc_Elec:false
  }
  caraCrear:Caracteristicas={
    Id_Car:0,
    Num_Ban:0,
    Num_Hab:0,
    Cocina:false,
    Sala:false,
    Comedor:false,
    Lavanderia:false,
    Num_Pis:0,
    Metraje:0,
    Jardin:false,
    Amoblado:false,
    Ascensor:false,
    Terraza:false
  }

  viviendaCrear:Vivienda={
    Id_Viv:0,
    Nombre:"",
    Precio:0,
    Tip_Pro:"",
    Estado:"",
    Latitud:-1.24908,
    Longitud:-78.61675,
    Id_Car_Per:0,
    Id_Ser_Per:0,
    Id_Con_Per:0,
    Id_Ubi_Per:0,
    Id_Usu_Per:this.usuarioPertenece?.Id_Usu
  }
        
  imagenesSubir:Fotos={
    Id_Fot:0,
    Descripcion:"",
    Foto_Com:"",
    Id_Viv_Per:0
  }

  //Metodo para las imagenes
  CambioImagenes(event: any) {
    const files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Asegúrate de no exceder el límite de 5 imágenes
          if (this.imagenes.length < 6) {
            this.imagenes.push(e.target.result);
          }else{
            alert("Límite de 5 imágenes");
          }        
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
//Metodo para creacion del mapa
  ngAfterViewInit(): void {
    const mapProperties: google.maps.MapOptions = {      
      center: new google.maps.LatLng(this.viviendaCrear.Latitud!=undefined? this.viviendaCrear.Latitud:0, this.viviendaCrear.Latitud!=undefined? this.viviendaCrear.Longitud:0),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    //Crear el marcador con la posición
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.viviendaCrear.Latitud!=undefined? this.viviendaCrear.Latitud:0, this.viviendaCrear.Latitud!=undefined? this.viviendaCrear.Longitud:0),
      map: this.map,
      title: 'Marker Title',
      draggable: true
    });

    // Verificar si el marcador se creó correctamente antes de añadir un listener
    if (this.marker) {
      this.marker.addListener('click', () => {
        const infoWindow = new google.maps.InfoWindow({
          content: this.marker.getTitle()
        });
        infoWindow.open(this.map, this.marker);
      });
    }

    //Poner el evento drag para guardar la ubicación
    if (this.marker) {
      this.marker.addListener('drag', (event: google.maps.MapMouseEvent) => {
        const { latLng } = event;        
        if (latLng) {          
          this.viviendaCrear.Latitud=latLng.lat()
          this.viviendaCrear.Longitud=latLng.lng()
        }
      });
    }
  }
    //------------------------METODOS IMAGENES-------------------------------------

      //Metodo para convertir de imagen a bytes
//   onFileSelected(event: any) {
//     const selectedFile: File = event.target.files[0];

//     if (selectedFile) {
//       const reader = new FileReader();

//       reader.onload = (e: any) => {
//         const arrayBuffer: ArrayBuffer | null = e.target.result;
//         if (arrayBuffer) {
//           const uintArray = new Uint8Array(arrayBuffer);
//           this.fileBytes = uintArray;
//           // Aquí tendrás el arreglo de bytes (uintArray) de la imagen
//           console.log('Arreglo de bytes:', uintArray);
//           const stringBytes = this.uint8ArrayToBase64(uintArray);
//           let foto: Fotos = new Fotos(this.idViv, this.descrip, stringBytes);
//           this.sFotos.enviarFoto(foto);
//           //this.displayImageFromBytes(uintArray);
//         }
//       };

//       reader.readAsArrayBuffer(selectedFile);
//     }
//   }

//   //Metodo para convertir de bytes a imagen
//   displayImageFromBytes(encoded: Uint8Array) {        
//     // Convertir el ArrayBuffer a un Uint8Array
//     const byteArray = new Uint8Array(encoded);

//     const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Ajusta el tipo de archivo según el formato de la imagen
//     //aqui se pone la imagen
//     this.imageUrl = URL.createObjectURL(blob);
//     this.imagenes.push(this.imageUrl);
//   }

//   //Metodo para pasar de bits[] a base64 string
//   private uint8ArrayToBase64(array: Uint8Array): string {
//     let binary = '';
//     for (let i = 0; i < array.length; i++) {
//       binary += String.fromCharCode(array[i]);
//     }
//     return btoa(binary);
//   }
//   //De base 64 a bit[]
//   private base64ToUint8Array(base64String: string): Uint8Array {
//     const binaryString = atob(base64String);
//     const length = binaryString.length;
//     const uintArray = new Uint8Array(length);

//     for (let i = 0; i < length; i++) {
//         uintArray[i] = binaryString.charCodeAt(i);
//     }

//     return uintArray;
// }
  
}
