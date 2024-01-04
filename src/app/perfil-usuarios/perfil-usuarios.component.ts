import { Component } from '@angular/core';
import { ServicioUsuariosService } from '../servicio-usuarios.service';
import { OnInit,Output, EventEmitter  } from '@angular/core';
import { Usuario } from '../Modelos/Entidades.model';

@Component({
  selector: 'app-perfil-usuarios',
  templateUrl: './perfil-usuarios.component.html',
  styleUrl: './perfil-usuarios.component.css'
})
export class PerfilUsuariosComponent implements OnInit {

  constructor(private servicioUsuario:ServicioUsuariosService) { }

  @Output() usuarioCreado = new EventEmitter<boolean>();

  siLogeado() {
    this.usuarioCreado.emit(true);
  }
  noLogeado() {
    this.usuarioCreado.emit(false);
  }

  registerFormModel: Usuario = {
    Apellido1: '',
    Apellido2: '',
    Cedula: '',
    Contrasena: '',
    Correo: '',
    Est_Civ: '',
    Fec_Nac: '', 
    Id_Usu: 0,
    Nom_Usuario: '',
    Nombre1: '',
    Nombre2: '',
    Rol: '',
    Sexo: '',
    Telefono: ''
  };  

  ngOnInit(): void {
    // Lógica de inicialización si es necesaria
  }

  onRegisterSubmit() {    
    //this.registerFormModel.Fec_Nac = Date.parse(this.registerFormModel.Fec_Nac).toString();
    this.registerFormModel.Fec_Nac = '/Date(' + new Date(this.registerFormModel.Fec_Nac).getTime() + ')/';
    alert(this.registerFormModel.Fec_Nac)
    this.servicioUsuario.CrearUsuario(this.registerFormModel).subscribe(
        (data) => {
          if (data) {
            alert('Usuario registrado con éxito:');
            this.noLogeado();            
          }else{
            alert('El usuario no se pudo crear');
          }
          console.log("Estado de la creacion de usuario: "+data);
        },
        (error) => {
          alert('Error al registrar usuario: \n' + error);
          
        }
      );      
  }  
}