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
import { GaleriaComponent } from './Principal/galeria/galeria.component';
import { FooterComponent } from './Principal/footer/footer.component';
import { ItemComponent } from './item/item.component';
import { PublicarDepartamentosComponent } from './publicar-departamentos/publicar-departamentos.component';
import { DescripcionItemComponent } from './descripcion-item/descripcion-item.component';
import { CookieService } from 'ngx-cookie-service';
import { ReportesComponent } from './reportes/reportes.component';              
import { PerfilUsuariosComponent } from './perfil-usuarios/perfil-usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HearderComponent,  
    GaleriaComponent,
    FooterComponent,    
    ItemComponent,
    PublicarDepartamentosComponent,
    DescripcionItemComponent,
    ReportesComponent,
    PerfilUsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }





