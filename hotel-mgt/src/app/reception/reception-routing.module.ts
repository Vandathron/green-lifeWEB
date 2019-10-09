import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { GuestComponent } from './guest/guest.component';
import { RecepReportComponent } from './recep-report/recep-report.component';
import { RoutesGuard } from '../AuthGuards/routes.guard';

const routes: Routes = [
  {
    path: "rooms", component: RoomsComponent, canActivate: [RoutesGuard], data: {role: ["admin", "reception"]}
  },
  {
    path: "guests", component: GuestComponent, canActivate: [RoutesGuard], data: {role: ["admin", "reception"]}
  },
  {
    path: "report", component: RecepReportComponent, canActivate: [RoutesGuard], data: {role: ["admin", "reception"]}
  },
  {
    path: '', redirectTo: 'guests'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }
