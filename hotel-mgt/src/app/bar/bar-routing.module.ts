import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarPosComponent } from './bar-pos/bar-pos.component';
import { BarReportComponent } from './bar-report/bar-report.component';
import { RoutesGuard } from '../AuthGuards/routes.guard';

const routes: Routes = [
  {
    path: 'bar-pos', component: BarPosComponent, canActivate: [RoutesGuard], data: {role: ["admin", "bar"] }
  },
  {
    path: 'report', component: BarReportComponent, canActivate: [RoutesGuard], data: {role: ["admin", "bar", "reception"] }
  },
  {
    path: '', redirectTo: 'bar-pos'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarRoutingModule { }
