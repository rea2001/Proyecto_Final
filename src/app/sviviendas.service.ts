import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caracteristicas, Condiciones, Fotos, Servicios, Vivienda, ubicacion } from './Modelos/Entidades.model';

@Injectable({
  providedIn: 'root'
})
export class SviviendasService {

  constructor(private http: HttpClient) {}

  url:string="http://reaavero.somee.com/SArriendos.svc"
  //url:string="http://localhost:666/SArriendos.svc"
  
  vivendaElegida!:Vivienda

  crearCaracteristica(caracteristica:Caracteristicas){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.url+"/CrearCar", caracteristica, { headers: cabecera });
  }
  crearServicio(servicio:Servicios){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.url+"/CrearSer", servicio, { headers: cabecera });
  }

  crearCondicione(condicion:Condiciones){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.url+"/CrearCondicion", condicion, { headers: cabecera });
  }

  crearUbicacione(ubicacion:ubicacion){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.url+"/CrearUbi", ubicacion, { headers: cabecera });
  }

  crearVivienda(vivienda:Vivienda){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post<Vivienda>(this.url+"/CrearViv", vivienda, { headers: cabecera });
  }

  crearFotos(fotos:Fotos[]){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(fotos)
    return this.http.post<boolean>(this.url+"/InsertaFot", fotos, { headers: cabecera });
  }
    
  retornarUbicaciones(){    
    return this.http.get<ubicacion[]>(this.url+"/DevuelveUbi")
  }
  retornarTodasViviendas(){
    return this.http.get<Vivienda[]>(this.url+"/listaViv")
  }
  retornarViviendasPorIdUsuario(idUsuario:number){
    return this.http.get<Vivienda[]>(this.url+"/listaViv/"+idUsuario)
  }

  retornarUbicacionPorId(idUbicacion:number){
    return this.http.get<ubicacion>(this.url+"/DevuelveUbiViv/"+idUbicacion)
  }
  retornarCondicionesPorId(idCondiciones:number){
    return this.http.get<Condiciones>(this.url+"/DevuelveCondicionViv/"+idCondiciones)
  }
  retornarCaracteristicasPorId(idCaracteristica:number){
    return this.http.get<Caracteristicas>(this.url+"/DevuelveCarViv/"+idCaracteristica)
  }
  retornarServiciosPorId(idServicio:number){
    return this.http.get<Servicios>(this.url+"/DevuelveSerViv/"+idServicio)
  }
  retornarFotosPorIdVivienda(idVivienda:number){
    return this.http.get<Fotos[]>(this.url+"/DevuelveFotosViv/"+idVivienda)
  }
}
