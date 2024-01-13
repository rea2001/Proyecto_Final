import { ControlContainer } from "@angular/forms";

export class Vivienda {
    constructor(id_Vivienda: number, NombreVivienda: string, Precio: number, TipoPropiedad: string, Latitud: number,
        Longitud: number, Descripcion: string, Estado: string, IdCaracteristica: number, IdServicio: number, IdCondicion: number, IdUbicacion: number, IdUsuario: number) {
        this.Id_Viv = id_Vivienda;
        this.Nombre = NombreVivienda;
        this.Precio = Precio;
        this.Tip_Pro = TipoPropiedad;
        this.Latitud = Latitud;
        this.Longitud = Longitud;
        this.Descripcion = Descripcion;
        this.Estado = Estado;
        this.Id_Car_Per = IdCaracteristica;
        this.Id_Ser_Per = IdServicio;
        this.Id_Con_Per = IdCondicion;
        this.Id_Ubi_Per = IdUbicacion;
        this.Id_Usu_Per = IdUsuario;
    }
    Id_Viv: number = 0;
    Nombre: string = ""
    Precio: number = 0
    Tip_Pro: string = "";
    Latitud: number = 0;
    Longitud: number = 0;
    Descripcion: string  = "";
    Estado: string = "Disponible"
    Id_Car_Per: number = 0;
    Id_Ser_Per: number = 0;
    Id_Con_Per: number = 0;
    Id_Ubi_Per: number = 0;
    Id_Usu_Per: number = 0;
}

export class Caracteristicas{
    constructor(Id_Car: number, Num_Ban: number, Num_Hab:number, Num_Pis:number,Metraje:number, Cocina: boolean, Sala:boolean,Comedor: boolean,
        Lavanderia: boolean, Ascensor: boolean,Amoblado: boolean,Jardin: boolean,Terraza: boolean){
            this.Id_Car = Id_Car;
            this.Num_Ban = Num_Ban;
            this.Num_Hab = Num_Hab;
            this.Num_Pis = Num_Pis;
            this.Metraje = Metraje;
            this.Cocina = Cocina;
            this.Sala = Sala;
            this.Comedor = Comedor;
            this.Lavanderia = Lavanderia;
            this.Ascensor = Ascensor;
            this.Amoblado = Amoblado;
            this.Jardin = Jardin;
            this.Terraza = Terraza;
    }

    Id_Car: number = 0;
    Num_Ban: number = 0;
    Num_Hab: number = 0;
    Num_Pis: number = 0;
    Metraje: number= 0;
    Cocina: boolean = false;
    Sala: boolean = false;
    Comedor: boolean = false;
    Lavanderia: boolean = false;
    Ascensor: boolean = false;
    Amoblado: boolean = false;
    Jardin: boolean = false;
    Terraza: boolean = false;

}

export class Servicios{
    constructor(Id_Ser:number, Luz: boolean, Agua: boolean, Internet: boolean,Garaje: boolean,Telefono: boolean,
        Calefon: boolean,Duc_Elec: boolean){
            this.Id_Ser = Id_Ser;
            this.Agua = Agua;
            this.Luz = Luz;
            this.Internet = Internet;
            this.Garaje = Garaje;
            this.Telefono = Telefono;
            this.Calefon = Calefon;
            this.Duc_Elec = Duc_Elec;
        }

    Id_Ser: number = 0;
    Luz: boolean = false;
    Agua: boolean = false;
    Garaje: boolean = false;
    Internet: boolean = false;
    Telefono: boolean = false;
    Calefon: boolean = false;
    Duc_Elec: boolean = false;
}

export class Condiciones{
    constructor(Id_Con: number, Num_Pers: number, Mascotas: boolean, Fiestas: boolean, Garantia:number ){
        this.Id_Con = Id_Con;
        this.Num_Pers = Num_Pers;
        this.Garantia = Garantia;
        this.Mascotas = Mascotas;
        this.Fiestas = Fiestas;
    }

    Id_Con: number = 0;
    Garantia: number = 0;
    Num_Pers: number = 0;
    Mascotas: boolean = false;
    Fiestas: boolean = false;
}

export class ubicacion{
    constructor(Id_Ubi: number, Provincia: string, Canton: string, Parroquia: string){
        this.Id_Ubi = Id_Ubi;
        this.Provincia = Provincia;
        this.Canton = Canton;
        this.Parroquia = Parroquia;
    }
    Id_Ubi: number = 0;
    Provincia: string  = "";
    Canton: string  = "";
    Parroquia: string  = "";
}

export class Fotos{
    constructor(id_fot:number, Id_Viv_Per: number, Descripcion: string, Foto_Com: string){
        this.Id_Fot = id_fot;
        this.Id_Viv_Per = Id_Viv_Per;
        this.Descripcion = Descripcion;
        this.Foto_Com = Foto_Com;
    }
    Id_Fot: number = 0;
    Id_Viv_Per: number = 0;
    Descripcion: string  = "";
    Foto_Com: string  = "";
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
    Fec_Nac: string= "";

}
//MENSAJE-----------------------------------------------------------------------------------------------------
export class Mensaje{
    constructor( idPublicador:number, idArrendador:number, mensaje:string){
        this.Id_Men=0
        this.Id_Usu_Pub=idPublicador
        this.Id_Usu_Arr=idArrendador
        this.Mensaje_Env=mensaje
        this.Fecha= '/Date(' + new Date(Date.now.toString()).getTime() + ')/'
    }

    Id_Men:number=0
    Id_Usu_Pub:number=0
    Id_Usu_Arr:number=0
    Mensaje_Env:string=""
    Fecha: string= ""
}