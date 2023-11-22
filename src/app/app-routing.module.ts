import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrarProComponent } from './registrar-pro/registrar-pro.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'registrar-producto', component: RegistrarProComponent},
  {path:'**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
