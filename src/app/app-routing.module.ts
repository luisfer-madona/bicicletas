import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrarProComponent } from './registrar-pro/registrar-pro.component';
import { RegistrarCliComponent } from './registrar-cli/registrar-cli.component';
import { ListaProComponent } from './lista-pro/lista-pro.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'productos', component: ListaProComponent},
  {path:'productos/:id', component: RegistrarProComponent},
  {path:'registrar-cliente', component: RegistrarCliComponent},
  {path:'**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
