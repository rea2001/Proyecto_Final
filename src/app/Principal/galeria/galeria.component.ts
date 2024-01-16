import { Component, OnDestroy, OnInit } from '@angular/core';
import { Filtro, Usuario, Vivienda } from '../../Modelos/Entidades.model';
import { ServicioUsuariosService } from '../../servicio-usuarios.service';
import { SviviendasService } from '../../sviviendas.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent implements OnInit, OnDestroy {

  usuarioConectado!: Usuario | null
  constructor(private servicioUsuario: ServicioUsuariosService, private sViviendas: SviviendasService) { }
  esAdmin = 0;
  aplicado:string[]=[]
  aplicoFiltro=false;
  filtroHabitacion: string = "3"
  filtroBanos: string = "6"
  viviendas: Vivienda[] = []
  filtros: Filtro = {
    PrecioDesde: 0,
    PrecioHasta: 300,
    SuperficieDesde: 0,
    SuperficieHasta: 100,
    Parroquia: '',
    TipoVivienda: '',
    Ordenes: [0, 0, 0, 0, 0, 0]
  }

  ngOnInit(): void {
    this.cargarUsuario()
    if (this.esAdmin == 0 || this.esAdmin == 2) {
      this.sViviendas.retornarTodasViviendas()
        .subscribe(
          viviendasRetornadas => {
            this.viviendas = viviendasRetornadas.filter(x=>x.Estado=='Disponible')
          }
        )
    } else if (this.esAdmin == 1) {
      //TODO: Posible error
      this.sViviendas.retornarViviendasPorIdUsuario(this.usuarioConectado?.Id_Usu ? this.usuarioConectado.Id_Usu : 0)
        .subscribe(
          viviendasRetornadas => {
            this.viviendas = viviendasRetornadas
          },
          error => {
            console.log('error al traer viviendas del admin', error)
          }
        )
    }
  }

  ngOnDestroy(): void {
    // if (this.servicioUsuario.usuarioConectado && this.usuarioConectado) {
    //   this.servicioUsuario.usuarioConectado.Rol="0"

    //   console.log('entr');
    // }
    this.usuarioConectado = this.servicioUsuario.usuarioConectado;
    console.log(this.servicioUsuario.usuarioConectado?.Nombre1)
    console.log('¡La galería ha sido destruida!');
  }

  cargarUsuario() {
    this.usuarioConectado = this.servicioUsuario.usuarioConectado;
    if (this.usuarioConectado) {
      this.esAdmin = this.usuarioConectado.Rol == "Publicar" ? 1 : 2
    }
  }
  aceptarPrecio() {
    this.filtros.Ordenes[0] = 1;
    this.aplicarFiltros();
    this.aplicado.push('Por precio')
  }
  aceptarSuperficie() {
    this.filtros.Ordenes[1] = 2;
    this.aplicarFiltros();
    this.aplicado.push('Por superficie')
  }
  aceptarHabitaciones() {
    this.filtros.Ordenes[2] = parseInt(this.filtroHabitacion);
    this.aplicarFiltros();
    this.aplicado.push('Por habitaciones')
  }
  aceptarBanos() {
    this.filtros.Ordenes[3] = parseInt(this.filtroBanos);
    this.aplicarFiltros();
    this.aplicado.push('Por baños')
  }
  aceptarTipo(eleHtml: HTMLAnchorElement) {
    this.filtros.Ordenes[4] = 9;
    this.filtros.TipoVivienda = eleHtml.id
    this.aplicarFiltros();
    this.aplicado.push('Por Tipo de propiedad')
  }
  cargarParroquia() {
    this.filtros.Ordenes[5] = 10;
    this.aplicarFiltros();
    this.aplicado.push('Por parroquia')
  }
  eliminarFiltro(cualEliminar: number) {
    switch (cualEliminar) {
      case 0:
        this.filtros.Ordenes[0] = 0;
        this.aplicado=this.aplicado.filter(x=>x!='Por precio')
        break;
      case 1:
        this.filtros.Ordenes[1] = 0;
        this.aplicado=this.aplicado.filter(x=>x!='Por superficie')
        break;
      case 2:
        this.filtros.Ordenes[2] = 0;
        this.aplicado=this.aplicado.filter(x=>x!='Por habitaciones')
        break;
      case 3:
        this.filtros.Ordenes[3] = 0;
        this.aplicado=this.aplicado.filter(x=>x!='Por baños')
        break;
      case 4:
        this.filtros.Ordenes[4] = 0;
        this.aplicado=this.aplicado.filter(x=>x!='Por Tipo de propiedad')
        break;
      case 5:
        this.filtros.Ordenes[5] = 0;
        this.aplicado=this.aplicado.filter(x=>x!='Por parroquia')
        break;      
    }
    this.aplicarFiltros()
  }
  eliminarTodosFiltros(){
    this.filtros.Ordenes=[0,0,0,0,0,0];
    this.aplicado=[]
    this.ngOnInit();
    this.aplicoFiltro=false;
  }
  aplicarFiltros() {
    this.sViviendas.ObtenerFiltro(this.filtros).subscribe(
      viviendasFiltradas => {
        if (viviendasFiltradas != null) {
          this.viviendas = viviendasFiltradas
          this.aplicoFiltro=true;
        } else {
          alert('No se ha aplicado los filtros, revise el servidor')
        }
      },
      error => {
        console.log('No funcionaron los filtros error: ', error)
        alert('error al filtrar')
      }
    )
  }
}


