import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mensaje, Usuario } from './Modelos/Entidades.model';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioUsuariosService {

  constructor(private http: HttpClient, private cookie:CookieService) { 
    this.inicializarUsuarioConectado();
  }
  //url:string="http://reaavero.somee.com/SArriendos.svc"
  url:string="http://localhost:666/SArriendos.svc";
  usuarioConectado!:Usuario|null;
  esAdmin:boolean=false

  LogearUsuario(usuario:string, contraseña:string){
    return this.http.get<Usuario>(this.url+`/RegresaUsuario/${usuario}/${contraseña}`).pipe(
      tap(user => {        
        localStorage.setItem('usuarioConectado', JSON.stringify(user));
      })
    );;
  }
  ObtenerUsuarioPorId(id:number){
    return this.http.get<Usuario>(this.url+`/RegresaUsuarioPorId/${id}`)      
  }
  inicializarUsuarioConectado() {
    if (typeof localStorage !== 'undefined') {
      const usuarioGuardado = localStorage.getItem('usuarioConectado');
      if (usuarioGuardado) {
        this.usuarioConectado = JSON.parse(usuarioGuardado);
        this.esAdmin = this.usuarioConectado?.Rol === 'Publicar';
      }
    }
  }
  CrearUsuario(usuario:Usuario){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.url+"/Crear", usuario, { headers: cabecera });
  }
  
  ActualizarUsuario(usuario: Usuario) {
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.url + "/Actualizar", usuario, { headers: cabecera });
  }

  getUsuarioActual() {
    if (this.usuarioConectado) {
      return of(this.usuarioConectado);  // Importa 'of' from 'rxjs' para crear un observable
    } else {
      // Si no hay usuario conectado, intenta obtenerlo del almacenamiento local
      const usuarioGuardado = localStorage.getItem('usuarioConectado');
      if (usuarioGuardado) {
        this.usuarioConectado = JSON.parse(usuarioGuardado);
        this.esAdmin = this.usuarioConectado?.Rol === 'Publicar';
        return of(this.usuarioConectado);
      } else {
        return throwError('Usuario no encontrado');
      }
    }
  }
  
  crearSesion(estado:boolean){
    this.esAdmin=this.usuarioConectado?.Rol=="Publicar"?true:false
    this.cookie.set('isLoggedIn', estado.toString());
  }  
  verificaSesion():boolean{
    if(this.cookie.get('isLoggedIn')){
      return this.cookie.get('isLoggedIn')=="true"?true:false      
    }    
    return false;
  }  
  cerrarSesion(){
    this.cookie.set('isLoggedIn', "false");
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('usuarioConectado');
    }
    this.usuarioConectado=null    
    this.esAdmin=false;
  }  
  //Mensajes-----------------------------------------------
  CrearMensaje(mensaje:Mensaje){
    const cabecera = new HttpHeaders({ 'Content-Type': 'application/json' });    
    return this.http.post(this.url+"/CrearMen", mensaje, { headers: cabecera });
  }      
  retornarMensajesPorIdUsu(idPublicador:number, idArrendador:number){    
    return this.http.get<Mensaje[]>(this.url+"/DevuelveMenPorIdUsu/"+idPublicador+'/'+idArrendador)
  }
  retornarMensajesPorIdPub(idPublicador:number){
    return this.http.get<Mensaje[]>(this.url+"/DevuelveMenPorIdPub/"+idPublicador)
  }
  eliminarMensaje(idMensaje:number){
    return this.http.delete<boolean>(this.url+"/EliminarMen/"+idMensaje)
  }
}
