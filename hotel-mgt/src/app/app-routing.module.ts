import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// *******************************************************************************
// Layouts

import { Layout1Component } from './layout/layout-1/layout-1.component';
import { LoginComponent } from './login/login.component';
// *******************************************************************************
// Pages
// *******************************************************************************
// Routes


// *******************************************************************************



const routes: Routes = [
{ path: 'v', component: Layout1Component, children:[
  {
    path: 'admin', loadChildren: "./admin/admin.module#AdminModule"
  },
  {
    path: 'restaurant', loadChildren: "./restaurant/restaurant.module#RestaurantModule"
  },
  {
    path: 'reception', loadChildren: './reception/reception.module#ReceptionModule'
  },
  {
    path: 'bar', loadChildren: "./bar/bar.module#BarModule"
  }
],
},
{
  path: 'login', component: LoginComponent
},
{
  path: '', redirectTo: 'login', pathMatch: 'full'
}
  

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
exports: [RouterModule]
})
export class AppRoutingModule {}
