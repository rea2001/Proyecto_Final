import { ControlContainer } from "@angular/forms";

export class Vivienda {
    constructor(id_Vivienda?: number, NombreVivienda?: string, Precio?: number, TipoPropiedad?: string, Latitud?: number,
        Longitud?: number, Estado?: string, IdCaracteristica?: number, IdServicio?: number, IdCondicion?: number, IdUbicacion?: number, IdUsuario?: number) {
        this.Id_Viv = id_Vivienda;
        this.Nombre = NombreVivienda;
        this.Precio = Precio;
        this.Tip_Pro = TipoPropiedad;
        this.Latitud = Latitud;
        this.Longitud = Longitud;
        this.Estado = Estado;
        this.Id_Car_Per = IdCaracteristica;
        this.Id_Ser_Per = IdServicio;
        this.Id_Con_Per = IdCondicion;
        this.Id_Ubi_Per = IdUbicacion;
        this.Id_Usu_Per = IdUsuario;
    }
    Id_Viv?: number = 0;
    Nombre?: string = ""
    Precio?: number = 0
    Tip_Pro?: string = "";
    Latitud?: number = 0;
    Longitud?: number = 0;
    Estado?: string = "Disponible"
    Id_Car_Per?: number = 0;
    Id_Ser_Per?: number = 0;
    Id_Con_Per?: number = 0;
    Id_Ubi_Per?: number = 0;
    Id_Usu_Per?: number = 0;
}
//-------------------------------------------------------------------------------------
export class Usuario {
    constructor(Apellido1: string, Apellido2: string, cedula: string, contraseña: string, correo: string, estadoCivil: string, fechaNacimiento: string, idUsu: number, 
        nombreUsuario: string, nombre1: string, nombre2: string, rol: string, sexo: string, telefono: string) {
        this.Apellido1=Apellido1
        this.Apellido2=Apellido2
        this.Cedula=cedula
        this.Contrasena=contraseña
        this.Correo=correo
        this.Est_Civ=estadoCivil
        this.Fec_Nac= '/Date(' + new Date(fechaNacimiento).getTime() + ')/'
        this.Id_Usu=idUsu;
        this.Nom_Usuario=nombreUsuario
        this.Nombre1=nombre1
        this.Nombre2=nombre2
        this.Rol=rol
        this.Sexo=sexo
        this.Telefono=telefono
    }
    Apellido1: string = "";
    Apellido2: string = "";
    Cedula: string = "";
    Contrasena: string = "";
    Correo: string = "";
    Est_Civ: string = "";
    Id_Usu: number = 0;
    Nom_Usuario: string = "";
    Nombre1: string = "";
    Nombre2: string = "";
    Rol: string = "";
    Sexo: string = "";
    Telefono: string = "";
    Fec_Nac: string= ""; // Ajusta según la forma en que tu servicio maneje las fechas

}