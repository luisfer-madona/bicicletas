import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrarProComponent } from './registrar-pro/registrar-pro.component';
import { RegistrarCliComponent } from './registrar-cli/registrar-cli.component';
import { ListaProComponent } from './lista-pro/lista-pro.component';
import { ListaCliComponent } from './lista-cli/lista-cli.component';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { ListaVentasComponent } from './lista-ventas/lista-ventas.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'productos', component: ListaProComponent},
  {path: 'productos/:id', component: RegistrarProComponent},
  {path: 'clientes', component: ListaCliComponent},
  {path: 'clientes/:id', component: RegistrarCliComponent},
  {path: 'ventas', component: ListaVentasComponent},
  {path: 'ventas/crear', component: NuevaVentaComponent},
  {path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
