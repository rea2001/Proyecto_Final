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
import { ModalMensajeriaComponent } from './modal-mensajeria/modal-mensajeria.component';
import { VistaMensajesComponent } from './vista-mensajes/vista-mensajes.component';
import { VerMensajeComponent } from './ver-mensaje/ver-mensaje.component';
import { ModalViviendaComponent } from './Modal/modal-vivienda/modal-vivienda.component';
import { ModalViviendaEliminarComponent } from './Modal/modal-vivienda-eliminar/modal-vivienda-eliminar.component';
import { ModalUsuarioActualizarComponent } from './Modal/modal-usuario-actualizar/modal-usuario-actualizar.component';
import { ModalFotosComponent } from './Modal/modal-fotos/modal-fotos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalVerImagenComponent } from './modal-ver-imagen/modal-ver-imagen.component';


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
    PerfilUsuariosComponent,
    ModalMensajeriaComponent,
    VistaMensajesComponent,
    VerMensajeComponent,
    ModalViviendaComponent,
    ModalViviendaEliminarComponent,
    ModalUsuarioActualizarComponent,
    ModalFotosComponent,
    ModalVerImagenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule    
  ],
  providers: [
    provideClientHydration(),CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}





