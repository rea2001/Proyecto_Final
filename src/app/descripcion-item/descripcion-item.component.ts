/// <reference types="@types/google.maps" />

import { Component, ViewChild } from '@angular/core';
import { OnInit, Renderer2 } from '@angular/core';
import { Vivienda } from '../Modelos/Entidades.model';

@Component({
  selector: 'app-descripcion-item',
  templateUrl: './descripcion-item.component.html',
  styleUrl: './descripcion-item.component.css'
})
export class DescripcionItemComponent {
  estaVivienda:Vivienda=new Vivienda()
  constructor(private renderer: Renderer2) { }
  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;
  marker!: google.maps.Marker;

  lat: number = -1.24908; // Latitud inicial
  lng: number = -78.61675; // Longitud inicial

  ngAfterViewInit(): void {
    const mapProperties: google.maps.MapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    //Crear el marcador con la posición
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.lat, this.lng),
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
          this.lat=latLng.lat()
          this.lng=latLng.lng()
        }
      });
    }

  }
}
