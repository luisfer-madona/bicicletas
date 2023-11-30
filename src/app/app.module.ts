import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegistrarProComponent } from './registrar-pro/registrar-pro.component';
import { RegistrarCliComponent } from './registrar-cli/registrar-cli.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from './servicios/producto.service';
import { ListaProComponent } from './lista-pro/lista-pro.component';
import { ListaCliComponent } from './lista-cli/lista-cli.component';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegistrarProComponent,
    RegistrarCliComponent,
    ListaProComponent,
    ListaCliComponent,
    NuevaVentaComponent,
    ListaVentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ProductoService
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
