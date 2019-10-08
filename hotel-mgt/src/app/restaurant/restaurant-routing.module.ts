import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from '../shared/orders/orders.component';
import { PosComponent } from './pos/pos.component';
import { RestReportComponent } from './rest-report/rest-report.component';
import { RoutesGuard } from '../AuthGuards/routes.guard';

const routes: Routes = [
  {
    path: 'rest-pos', component:PosComponent, canActivate: [RoutesGuard], data: {role: ["admin", "restaurant", "bar"] }
  },
  {
    path: 'report',component: RestReportComponent, canActivate: [RoutesGuard], data: {role: ["admin", "restaurant", "reception"]}
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
