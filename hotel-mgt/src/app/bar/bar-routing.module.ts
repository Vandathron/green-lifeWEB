import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarPosComponent } from './bar-pos/bar-pos.component';
import { BarReportComponent } from './bar-report/bar-report.component';

const routes: Routes = [
  {
    path: 'bar-pos', component: BarPosComponent
  },
  {
    path: 'report', component: BarReportComponent
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
