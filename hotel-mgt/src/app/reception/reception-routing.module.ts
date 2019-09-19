import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { BookingComponent } from './booking/booking.component';
import { GuestComponent } from './guest/guest.component';

const routes: Routes = [
  {
    path: "rooms", component: RoomsComponent
  },
  {
    path: "bookings", component: BookingComponent
  },
  {
    path: "guests", component: GuestComponent
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
