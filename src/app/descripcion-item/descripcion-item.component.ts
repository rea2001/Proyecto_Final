/// <reference types="@types/google.maps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { Caracteristicas, Condiciones, Fotos, Servicios, Usuario, Vivienda, ubicacion } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { SviviendasService } from '../sviviendas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalVerImagenComponent } from '../modal-ver-imagen/modal-ver-imagen.component';

@Component({
  selector: 'app-descripcion-item',
  templateUrl: './descripcion-item.component.html',
  styleUrl: './descripcion-item.component.css'
})
export class DescripcionItemComponent implements OnInit {
  constructor(private sUsuarios: ServicioUsuariosService, private sViviendas: SviviendasService, private modalService: NgbModal) { }
  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  estaMostrando=false

  estaVivienda!: Vivienda
  usuario!: Usuario
  ubicaciones!: ubicacion
  condiciones!: Condiciones
  servicio!: Servicios
  caracteristica!: Caracteristicas
  fotos: Fotos[]=[]
  imagenes: string[]=[]
  imagenElegida!: string
  indexFoto:number=0

  ngOnInit(): void {
    if (this.sUsuarios.usuarioConectado) {
      this.usuario = this.sUsuarios.usuarioConectado
      console.log('vivienda servicio')
      console.log(this.sViviendas.vivendaElegida)
      this.estaVivienda = this.sViviendas.vivendaElegida
      this.cargarTodoVivienda();
    }
  }

  carusel(esSegundo:boolean){
    if (!esSegundo) {
      return this.imagenes.slice(0, 3)
    }else{
      if (this.imagenes.length>3) {        
        return this.imagenes.slice(3, 6)
      }else{
        return this.imagenes.slice(0, 2)
      }
    }
  }

  abrirModal(){
    const modalRef = this.modalService.open(ModalVerImagenComponent);
    modalRef.componentInstance.imagenes = this.imagenes;
    modalRef.componentInstance.fotos = this.fotos
    modalRef.componentInstance.eleccionImagen = this.indexFoto
    modalRef.result.then(
      (result) => {
        if (result === 'delete') {
          
        } else if (result === 'accept') {

        }
      },
      (reason) => {
        // Lógica para el caso de cierre del modal sin aceptar ni eliminar
      }
    );
  }

  ngAfterViewInit(): void {
    const mapProperties: google.maps.MapOptions = {
      center: new google.maps.LatLng(this.estaVivienda.Latitud, this.estaVivienda.Longitud),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    //Crear el marcador con la posición
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.estaVivienda.Latitud, this.estaVivienda.Longitud),
      map: this.map,
      title: 'Se arrienda',
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

  }

  cargarTodoVivienda() {

    this.sViviendas.retornarUbicacionPorId(this.estaVivienda.Id_Ubi_Per).subscribe(
      ubicacion => {
        this.ubicaciones = ubicacion
      },
      error => {
        console.log(error)
      }
    )
    this.sViviendas.retornarCondicionesPorId(this.estaVivienda.Id_Con_Per).subscribe(
      condicion => {
        this.condiciones = condicion
      },
      error => {
        console.log(error)
      }
    )
    this.sViviendas.retornarServiciosPorId(this.estaVivienda.Id_Ser_Per).subscribe(
      servicio => {
        this.servicio = servicio
      },
      error => {
        console.log(error)
      }
    )
    this.sViviendas.retornarCaracteristicasPorId(this.estaVivienda.Id_Car_Per).subscribe(
      caracteristica => {
        this.caracteristica = caracteristica
      },
      error => {
        console.log(error)
      }
    )
    this.sViviendas.retornarFotosPorIdVivienda(this.estaVivienda.Id_Viv).subscribe(
      fotos => {
        this.fotos = fotos        
        this.displayImageFromBytes()
      },
      error => {
        console.log(error)
      }
    )
    console.log('componenete vivienda')
    console.log(this.caracteristica)
    console.log(this.condiciones)
    console.log(this.estaVivienda)
    console.log(this.fotos)
    console.log(this.servicio)
    console.log(this.ubicaciones)

  }

  //Metodo para convertir de bytes a imagen
  displayImageFromBytes() {
    // Convertir el ArrayBuffer a un Uint8Array
    for (let i = 0; i < this.fotos.length; i++) {      
      let encoded=this.base64ToUint8Array(this.fotos[i].Foto_Com)
      const byteArray = new Uint8Array(encoded);
      
      const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Ajusta el tipo de archivo según el formato de la imagen
      //aqui se pone la imagen
      let imageUrl = URL.createObjectURL(blob);      
      this.imagenes.push(imageUrl);
    }
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
