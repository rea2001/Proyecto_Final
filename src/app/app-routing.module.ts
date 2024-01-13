import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HearderComponent } from './Principal/hearder/hearder.component';
import { GaleriaComponent } from './Principal/galeria/galeria.component';
import { FooterComponent } from './Principal/footer/footer.component';
import { PublicarDepartamentosComponent } from './publicar-departamentos/publicar-departamentos.component';
import { DescripcionItemComponent } from './descripcion-item/descripcion-item.component';
import { ReportesComponent } from './reportes/reportes.component';
import { PerfilUsuariosComponent } from './perfil-usuarios/perfil-usuarios.component';
import { ModalMensajeriaComponent } from './modal-mensajeria/modal-mensajeria.component';
import { VistaMensajesComponent } from './vista-mensajes/vista-mensajes.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component: GaleriaComponent, pathMatch: 'full'},
  {path: 'galeria', component: GaleriaComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full' },
  {path: 'registro',component: RegistroComponent, pathMatch: 'full'},    
  {path: 'publicar-departamentos',component: PublicarDepartamentosComponent, pathMatch: 'full'},
  {path: 'descripcionItem',component: DescripcionItemComponent, pathMatch: 'full'},
  {path: 'reportes', component: ReportesComponent, pathMatch: 'full'},
  {path: 'perfil-usuarios', component: PerfilUsuariosComponent, pathMatch: 'full'},
  {path: 'modal-mensajeria', component: ModalMensajeriaComponent, pathMatch: 'full'},
  {path: 'vista-mensajes', component: VistaMensajesComponent, pathMatch: 'full'}
  // Puedes agregar más rutas según tus necesidades
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
