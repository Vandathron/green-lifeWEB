import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffComponent } from './staff/staff.component';
import { RoutesGuard } from '../AuthGuards/routes.guard';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
  },
  {
    path: '', redirectTo: 'dashboard',pathMatch: 'full'
  },
  {
    path: 'staffs', component: StaffComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
