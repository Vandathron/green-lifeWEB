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
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'restaurant', loadChildren: () => import('./restaurant/restaurant.module').then(res => res.RestaurantModule)
  },
  {
    path: 'reception', loadChildren: () => import('./reception/reception.module').then(r => r.ReceptionModule)
  },
  {
    path: 'bar', loadChildren: () => import('./bar/bar.module').then(bar => bar.BarModule)
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
