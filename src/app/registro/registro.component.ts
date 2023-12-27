import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,Output, EventEmitter  } from '@angular/core';


interface Usuario {
  Apellido1: string;
  Apellido2: string;
  Cedula: string;
  Contrasena: string;
  Correo: string;
  Est_Civ: string;
  Fec_Nac: string; // Ajusta según la forma en que tu servicio maneje las fechas
  Id_Usu: number;
  Nom_Usuario: string;
  Nombre1: string;
  Nombre2: string;
  Rol: string;
  Sexo: string;
  Telefono: string;
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

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
    Fec_Nac: '', // Ajusta según la forma en que tu servicio maneje las fechas
    Id_Usu: 0,
    Nom_Usuario: '',
    Nombre1: '',
    Nombre2: '',
    Rol: '',
    Sexo: '',
    Telefono: ''
  };

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    // Lógica de inicialización si es necesaria
  }

  onRegisterSubmit() {
    const url = 'http://reaavero.somee.com/SArriendos.svc/Crear';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Ajustamos la fecha de nacimiento según el formato esperado por el servicio
    this.registerFormModel.Fec_Nac = '/Date(' + new Date(this.registerFormModel.Fec_Nac).getTime() + ')/';

    this.httpClient.post(url, this.registerFormModel, { headers: headers })
      .subscribe(
        (data) => {
          alert('Usuario registrado con éxito:'+ data);
          this.noLogeado();
        },
        (error) => {
          alert('Error al registrar usuario:' + error);
          
        }
      );
  }
}
