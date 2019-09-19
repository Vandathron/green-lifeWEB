import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { GuestComponent } from './guest/guest.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularmaterialModule } from '../material/angularmaterial/angularmaterial.module';
import { RoomsComponent } from './rooms/rooms.component';
import { BookingComponent } from './booking/booking.component';
import { RecepReportComponent } from './recep-report/recep-report.component';

@NgModule({
  declarations: [GuestComponent, RoomsComponent, BookingComponent, RecepReportComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    AngularmaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ReceptionRoutingModule
  ]
})
export class ReceptionModule { }
