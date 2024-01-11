/// <reference types="@types/google.maps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { Vivienda, Usuario, Caracteristicas, Servicios, Condiciones, Fotos, ubicacion } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { SviviendasService } from '../sviviendas.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-publicar-departamentos',
  templateUrl: './publicar-departamentos.component.html',
  styleUrl: './publicar-departamentos.component.css'
})
export class PublicarDepartamentosComponent implements OnInit {

  constructor(private servicioUsuario: ServicioUsuariosService, private Sviviendas: SviviendasService, private route: Router) { }

  ngOnInit(): void {
    this.Sviviendas.retornarUbicaciones()
      .subscribe(
        (ubicacionesTraidas: ubicacion[]) => { this.ubicaciones = ubicacionesTraidas; console.log(ubicacionesTraidas) },
        error => { alert("error select de ubis"); console.log(error) }
      )
  }

  @ViewChild('map') mapElement: any;
  ubicaciones!: ubicacion[];
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  imagenes: string[] = [];
  usuarioPertenece: Usuario | null = this.servicioUsuario.usuarioConectado  
  fileBytes: Uint8Array | undefined;
  fotos: Fotos[] = []


  condicioCrear: Condiciones = {
    Id_Con: 0,
    Fiestas: false,
    Garantia: 0,
    Mascotas: false,
    Num_Pers: 0
  }
  serviCrear: Servicios = {
    Id_Ser: 0,
    Luz: false,
    Agua: false,
    Internet: false,
    Garaje: false,
    Telefono: false,
    Calefon: false,
    Duc_Elec: false
  }
  caraCrear: Caracteristicas = {
    Id_Car: 0,
    Num_Ban: 0,
    Num_Hab: 0,
    Cocina: false,
    Sala: false,
    Comedor: false,
    Lavanderia: false,
    Num_Pis: 0,
    Metraje: 0,
    Jardin: false,
    Amoblado: false,
    Ascensor: false,
    Terraza: false
  }

  viviendaCrear: Vivienda = {
    Id_Viv: 0,
    Nombre: "",
    Precio: 0,
    Tip_Pro: "",
    Estado: "Disponible",
    Latitud: -1.24908,
    Descripcion:'',
    Longitud: -78.61675,
    Id_Car_Per: 0,
    Id_Ser_Per: 0,
    Id_Con_Per: 0,
    Id_Ubi_Per: 0,
    Id_Usu_Per: this.usuarioPertenece?.Id_Usu?this.usuarioPertenece?.Id_Usu:0
  }

  imagenesSubir: Fotos = {
    Id_Fot: 0,
    Descripcion: "",
    Foto_Com: "",
    Id_Viv_Per: 0
  }
  //Metodo para las imagenes
  // CambioImagenes(event: any) {
  //  const files = event.target.files;
  // //const files: File = event.target.files[0];

  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         // Asegúrate de no exceder el límite de 5 imágenes
  //         if (this.imagenes.length < 6) {
  //           //------------------------------------------------------------------
  //           const arrayBuffer: ArrayBuffer | null = e.target.result;
  //           console.log(arrayBuffer)
  //           if (arrayBuffer) {
  //             const uintArray = new Uint8Array(arrayBuffer);
  //             this.fileBytes = uintArray;
  //             // El arreglo de bytes es uintArray de la imagen
  //             console.log('Arreglo de bytes:', uintArray);
  //             const stringBytes = this.uint8ArrayToBase64(uintArray);
  //             let foto: Fotos = new Fotos(0, "Foto ", stringBytes);
  //             alert(foto.Descripcion)
  //             console.log('los bytes')
  //             console.log(stringBytes)
  //             console.log("foto")
  //             console.log(foto)
  //             this.fotos.push(foto);
  //             this.imagenes.push(e.target.result);
  //           }        
  //           //------------------------------------------------------------------
  //         } else {
  //           alert("Límite de 5 imágenes");
  //         }
  //       };
  //       reader.readAsDataURL(files[i]);
  //     }
  //   }
  // }

  CambioImagenes(event: any) {
    Array.from(event.target.files).forEach((file) => {
      if (file instanceof File) {

        const selectedFile: File = file;
        if (selectedFile) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            const arrayBuffer: ArrayBuffer | null = e.target.result;
            if (arrayBuffer) {
              const uintArray = new Uint8Array(arrayBuffer);
              this.fileBytes = uintArray;
              // Aquí tendrás el arreglo de bytes (uintArray) de la imagen
              console.log('Arreglo de bytes:', uintArray);
              const stringBytes = this.uint8ArrayToBase64(uintArray);
              let foto: Fotos = new Fotos(0, "Foto ", stringBytes);
              this.fotos.push(foto);

              const byteArray = new Uint8Array(uintArray);

              const blob = new Blob([byteArray], { type: 'image/jpeg' }); // Ajusta el tipo de archivo según el formato de la imagen
              //    aqui se pone la imagen
              let imageUrl = URL.createObjectURL(blob);
              this.imagenes.push(imageUrl);
              //this.displayImageFromBytes(uintArray);
            }
          };

          reader.readAsArrayBuffer(selectedFile);
        }

      }
    });

  }


  //Metodo para pasar de bits[] a base64 string
  private uint8ArrayToBase64(array: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < array.length; i++) {
      binary += String.fromCharCode(array[i]);
    }
    return btoa(binary);
  }

  //Metodo para creacion del mapa
  ngAfterViewInit(): void {
    const mapProperties: google.maps.MapOptions = {
      center: new google.maps.LatLng(this.viviendaCrear.Latitud != undefined ? this.viviendaCrear.Latitud : 0, this.viviendaCrear.Latitud != undefined ? this.viviendaCrear.Longitud : 0),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);

    //Crear el marcador con la posición
    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.viviendaCrear.Latitud != undefined ? this.viviendaCrear.Latitud : 0, this.viviendaCrear.Latitud != undefined ? this.viviendaCrear.Longitud : 0),
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
          this.viviendaCrear.Latitud = latLng.lat()
          this.viviendaCrear.Longitud = latLng.lng()
        }
      });
    }
  }

  // CrearVivienda(e:Event){
  //   e.preventDefault();

  //   this.Sviviendas.crearCaracteristica(this.caraCrear)
  //   .subscribe(
  //     (caracteristicaCreada:Caracteristicas)=>{
  //       this.caraCrear=caracteristicaCreada;
  //       this.viviendaCrear.Id_Car_Per=this.caraCrear.Id_Car;
  //     },
  //     error=>{
  //       console.log('Ha ocurrido un error al crear la caracteristica: ', error)
  //       alert('Ha ocurrido un error al crear la caracteristica')
  //     }
  //   )

  //   this.Sviviendas.crearCondicione(this.condicioCrear)
  //   .subscribe(
  //     (condicionCreada:Condiciones)=>{
  //       this.condicioCrear=condicionCreada;
  //       this.viviendaCrear.Id_Con_Per=this.condicioCrear.Id_Con
  //     },
  //     error=>{
  //       console.log('Ha ocurrido un error al crear la condicion: ', error)
  //       alert('Ha ocurrido un error al crear la condicion')
  //     }
  //   )

  //   this.Sviviendas.crearServicio(this.serviCrear)
  //   .subscribe(
  //     (servicioCreado:Servicios)=>{
  //       this.serviCrear=servicioCreado;
  //       this.viviendaCrear.Id_Ser_Per=this.serviCrear.Id_Ser;
  //     },
  //     error=>{
  //       console.log('Ha ocurrido un error al crear la servicio: ', error)
  //       alert('Ha ocurrido un error al crear la servicio')
  //     }
  //   )

  //   this.Sviviendas.crearVivienda(this.viviendaCrear)
  //   .subscribe(
  //     (viviendaCreada:Vivienda)=>{
  //       this.viviendaCrear=viviendaCreada;
  //       alert("Vivienda Creada Exitosamente")
  //       this.route.navigate(['/home'])
  //     },
  //     error=>{
  //       console.log('Ha ocurrido un error al crear la vivenda: ', error)
  //       alert('Ha ocurrido un error al crear la vivienda')
  //     }
  //   )


  // }

  //Segundo metodo

  CrearVivienda(e: Event) {
    e.preventDefault();

    const caracteristicaObservable = this.Sviviendas.crearCaracteristica(this.caraCrear);
    const condicionObservable = this.Sviviendas.crearCondicione(this.condicioCrear);
    const servicioObservable = this.Sviviendas.crearServicio(this.serviCrear);

    forkJoin({
      caracteristica: caracteristicaObservable,
      condicion: condicionObservable,
      servicio: servicioObservable
    }).subscribe(
      (result: any) => {
        alert(this.viviendaCrear.Id_Ubi_Per)
        console.log(this.viviendaCrear)
        this.viviendaCrear.Id_Car_Per = result.caracteristica.Id_Car;
        this.viviendaCrear.Id_Con_Per = result.condicion.Id_Con;
        this.viviendaCrear.Id_Ser_Per = result.servicio.Id_Ser;

        this.Sviviendas.crearVivienda(this.viviendaCrear).subscribe(
          (viviendaCreada: Vivienda) => {
            if (viviendaCreada) {
              console.log('Vienda recibida')
              console.log(viviendaCreada)
              this.viviendaCrear = viviendaCreada
              this.fotos.forEach(foto => {
                foto.Id_Viv_Per = viviendaCreada.Id_Viv
              });
              this.Sviviendas.crearFotos(this.fotos).subscribe(
                (resultadoFoto: boolean) => {
                  if (resultadoFoto) {
                    alert("Vivienda Creada Exitosamente");
                    this.route.navigate(['/home']);
                  } else {
                    alert("Vivienda No se pudo crear");
                  }
                },
                error => {
                  alert("Vivienda No se pudo crear");
                }
              )
            } else {
              alert("La vivienda no se ha creado");
            }

          },
          error => {
            console.log('Ha ocurrido un error al crear la vivienda: ', error);
            alert('Ha ocurrido un error al crear la vivienda');
          }
        );
      },
      error => {
        console.log('Ha ocurrido un error al crear características, condiciones o servicios: ', error);
        alert('Ha ocurrido un error al crear características, condiciones o servicios');
      }
    );
  }

  EscogioParroquia(parroquiasSelect: HTMLSelectElement) {
    this.viviendaCrear.Id_Ubi_Per = parseInt(parroquiasSelect.value)
    alert(this.viviendaCrear.Id_Ubi_Per)
  }
  

}
