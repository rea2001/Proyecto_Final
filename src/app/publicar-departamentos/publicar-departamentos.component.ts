/// <reference types="@types/google.maps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { Vivienda, Usuario, Caracteristicas, Servicios, Condiciones, Fotos, ubicacion } from '../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { SviviendasService } from '../sviviendas.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFotosComponent } from '../Modal/modal-fotos/modal-fotos.component';

@Component({
  selector: 'app-publicar-departamentos',
  templateUrl: './publicar-departamentos.component.html',
  styleUrl: './publicar-departamentos.component.css'
})
export class PublicarDepartamentosComponent implements OnInit {

  constructor(private servicioUsuario: ServicioUsuariosService, private Sviviendas: SviviendasService,
     private route: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.estaEditando = this.Sviviendas.estaEditando
    this.Sviviendas.retornarUbicaciones()
      .subscribe(
        (ubicacionesTraidas: ubicacion[]) => { this.ubicaciones = ubicacionesTraidas; console.log(ubicacionesTraidas) },
        error => { alert("error select de ubis"); console.log(error) }
      )
    if (this.estaEditando) {
      this.viviendaCrear = this.Sviviendas.vivendaElegida
      this.cargarTodoVivienda();
    }
  }
  estaEditando: boolean = false
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
    Descripcion: '',
    Longitud: -78.61675,
    Id_Car_Per: 0,
    Id_Ser_Per: 0,
    Id_Con_Per: 0,
    Id_Ubi_Per: 0,
    Id_Usu_Per: this.usuarioPertenece?.Id_Usu ? this.usuarioPertenece?.Id_Usu : 0
  }


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
              const stringBytes = this.uint8ArrayToBase64(uintArray);
              let foto: Fotos = new Fotos(0, this.viviendaCrear.Id_Viv, "Foto ", stringBytes);
              this.fotos.push(foto);

              const byteArray = new Uint8Array(uintArray);

              const blob = new Blob([byteArray], { type: 'image/jpeg' });              
              let imageUrl = URL.createObjectURL(blob);
              this.imagenes.push(imageUrl);              
            }
          };

          reader.readAsArrayBuffer(selectedFile);
        }

      }
    });
  }

  openModal(imageUrl: string, index: number) {
    const modalRef = this.modalService.open(ModalFotosComponent);
    modalRef.componentInstance.image = imageUrl;
  
    modalRef.result.then(
      (result) => {
        if (result === 'delete') {             
          this.deleteImage(index);
        } else if (result === 'accept') {
          // Lógica para aceptar la imagen
        }
      },
      (reason) => {
        // Lógica para el caso de cierre del modal sin aceptar ni eliminar
      }
    );
  }
  
  // Método para eliminar la imagen
  deleteImage(index: number) {
    this.imagenes.splice(index, 1);
    this.fotos.splice(index, 1);
    // También elimina la imagen de la lista de fotos (this.fotos) si es necesario
     // Asegúrate de que la lista 'imagenes' se actualice después de la eliminación
  this.fotos =[...this.fotos]
  this.imagenes = [...this.imagenes];  
  console.log(this.fotos)
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

  CrearVivienda(e: Event) {
    e.preventDefault();    

    const caracteristicaObservable = this.estaEditando ? this.Sviviendas.modificarCaracteristica(this.caraCrear) : this.Sviviendas.crearCaracteristica(this.caraCrear);
    const condicionObservable = this.estaEditando ? this.Sviviendas.modificarCondicion(this.condicioCrear) : this.Sviviendas.crearCondicione(this.condicioCrear);
    const servicioObservable = this.estaEditando ? this.Sviviendas.modificarServicio(this.serviCrear) : this.Sviviendas.crearServicio(this.serviCrear);    

    forkJoin({
      caracteristica: caracteristicaObservable,
      condicion: condicionObservable,
      servicio: servicioObservable    
    }).subscribe(
      (result: any) => {
        if (this.estaEditando) {
          if (result.caracteristica && result.condicion && result.servicio) {
            this.Sviviendas.modificarViviendas(this.viviendaCrear).subscribe(
              seCreo=>{
                if (seCreo) {
                  this.Sviviendas.modificarFotos(this.fotos).subscribe(
                    estaFotos=>{
                      if (estaFotos) {
                        alert('Se ha modificado la vivienda correctamente')                        
                      }else{
                        alert('No se ha modificado la vivienda')
                      }                      
                    },
                    errorFot=>{alert('No ha creado la vivienda'); console.log('Error al modificar las fotos',errorFot)}
                  )
                }else{

                }
              },
              error=>{
                alert('No ha creado la vivienda')
                console.log('error al modificar la vivienda',error)
              }
            )
            
          } else {
            console.log('error al actualuzar caracteristica o condicion o servicio o fotos')
            alert('No se pudo actualizar la vivienda')
          }

        } else {
          console.log(this.viviendaCrear)
          this.viviendaCrear.Id_Car_Per = result.caracteristica.Id_Car;
          this.viviendaCrear.Id_Con_Per = result.condicion.Id_Con;
          this.viviendaCrear.Id_Ser_Per = result.servicio.Id_Ser;
          this.Sviviendas.crearVivienda(this.viviendaCrear).subscribe(
            (viviendaCreada: Vivienda) => {
              if (viviendaCreada) {
                console.log('Vivienda recibida')
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
          )
        };
      },
      error => {
        console.log('Ha ocurrido un error al crear características, condiciones o servicios: ', error);
        alert('Ha ocurrido un error al crear características, condiciones o servicios');
      }
    );
  }

  EscogioParroquia(parroquiasSelect: HTMLSelectElement) {
    this.viviendaCrear.Id_Ubi_Per = parseInt(parroquiasSelect.value)
  }

  //Actualizar depa--------------------------------------------------------------
  cargarTodoVivienda() {

    this.Sviviendas.retornarUbicacionPorId(this.viviendaCrear.Id_Ubi_Per).subscribe(
      ubicacion => {
        this.viviendaCrear.Id_Ubi_Per = ubicacion.Id_Ubi
      },
      error => {
        console.log(error)
      }
    )
    this.Sviviendas.retornarCondicionesPorId(this.viviendaCrear.Id_Con_Per).subscribe(
      condicion => {
        this.condicioCrear = condicion
      },
      error => {
        console.log(error)
      }
    ),

    this.Sviviendas.retornarServiciosPorId(this.viviendaCrear.Id_Ser_Per).subscribe(
      servicio => {
        this.serviCrear = servicio
      },
      error => {
        console.log(error)
      }
    )
    this.Sviviendas.retornarCaracteristicasPorId(this.viviendaCrear.Id_Car_Per).subscribe(
      caracteristica => {
        this.caraCrear = caracteristica
      },
      error => {
        console.log(error)
      }
    )
    this.Sviviendas.retornarFotosPorIdVivienda(this.viviendaCrear.Id_Viv).subscribe(
      fotos => {
        this.fotos = fotos
        this.displayImageFromBytes()
      },
      error => {
        console.log(error)
      }
    )

  }

  displayImageFromBytes() {
    for (let i = 0; i < this.fotos.length; i++) {
      let encoded = this.base64ToUint8Array(this.fotos[i].Foto_Com)
      const byteArray = new Uint8Array(encoded);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
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
