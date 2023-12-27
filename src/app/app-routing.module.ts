import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HearderComponent } from './Principal/hearder/hearder.component';
import { NavegacionComponent } from './Principal/navegacion/navegacion.component';
import { BusquedaComponent } from './Principal/busqueda/busqueda.component';
import { GaleriaComponent } from './Principal/galeria/galeria.component';
import { FooterComponent } from './Principal/footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { PublicarDepartamentosComponent } from './publicar-departamentos/publicar-departamentos.component';

const routes: Routes = [
  {path: '', redirectTo:'/principal', pathMatch:'full'},
  {path: 'principal', component: InicioComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent, pathMatch: 'full' },
  {path: 'registro',component: RegistroComponent, pathMatch: 'full'},
  {path: 'header',component: HearderComponent, pathMatch: 'full'},
  {path: 'navegacion',component: NavegacionComponent, pathMatch: 'full'},
  {path: 'busqueda',component: BusquedaComponent, pathMatch: 'full' },
  {path: 'galeria', component: GaleriaComponent, pathMatch: 'full'},
  {path: 'footer',component: FooterComponent, pathMatch: 'full'},
  {path: 'publicar-departamentos',component: PublicarDepartamentosComponent, pathMatch: 'full'}
  // Puedes agregar más rutas según tus necesidades
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
