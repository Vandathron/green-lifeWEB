import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffComponent } from './staff/staff.component';
import { RoutesGuard } from '../AuthGuards/routes.guard';
import { RecepReportComponent } from '../reception/recep-report/recep-report.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,canActivate: [RoutesGuard], data: { "role": ["admin", "reception"]}
  },
  
  {
    path: 'staffs', component: StaffComponent, canActivate:[RoutesGuard] , data: {role: "admin"}
  }, 
  {
    path: 'reports', component: RecepReportComponent, canActivate:[RoutesGuard], data: {role: "admin"}
  },
  {
    path: '', redirectTo: 'dashboard',pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
