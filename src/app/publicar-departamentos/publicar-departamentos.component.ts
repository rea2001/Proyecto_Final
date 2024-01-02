/// <reference types="@types/google.maps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-publicar-departamentos',
  templateUrl: './publicar-departamentos.component.html',
  styleUrl: './publicar-departamentos.component.css'
})
export class PublicarDepartamentosComponent {

  @ViewChild('map') mapElement: any;
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  lat: number = -1.24908; // Latitud inicial
  lng: number = -78.61675; // Longitud inicial
    

  constructor(private fb: FormBuilder) {}
        
  selectedImages: string[] = [];

  onFileChange(event: any) {
    const files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          // Asegúrate de no exceder el límite de 5 imágenes
          if (this.selectedImages.length < 5) {
            this.selectedImages.push(e.target.result);
          }else{
            alert("Límite de 5 imágenes");
          }
        
        };

        reader.readAsDataURL(files[i]);
      }
    }
  }


//___________________________________-  

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
