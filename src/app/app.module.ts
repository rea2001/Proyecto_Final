import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HearderComponent } from './Principal/hearder/hearder.component';
import { NavegacionComponent } from './Principal/navegacion/navegacion.component';
import { BusquedaComponent } from './Principal/busqueda/busqueda.component';
import { GaleriaComponent } from './Principal/galeria/galeria.component';
import { FooterComponent } from './Principal/footer/footer.component';
import { InicioComponent } from './inicio/inicio.component';
import { ItemComponent } from './item/item.component';
import { PublicarDepartamentosComponent } from './publicar-departamentos/publicar-departamentos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HearderComponent,
    NavegacionComponent,
    BusquedaComponent,
    GaleriaComponent,
    FooterComponent,
    InicioComponent,
    ItemComponent,
    PublicarDepartamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





