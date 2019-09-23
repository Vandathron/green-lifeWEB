import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from '../shared/orders/orders.component';
import { PosComponent } from './pos/pos.component';
import { RestReportComponent } from './rest-report/rest-report.component';

const routes: Routes = [
  {
    path: 'rest-pos', component:PosComponent,
  },
  {
    path: 'report',component: RestReportComponent
  },
  {
    path: '', redirectTo: 'rest-pos', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
