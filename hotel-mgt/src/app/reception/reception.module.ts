import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { GuestComponent } from './guest/guest.component';
import { NgbModule, NgbTimepickerModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {DatetimePopupModule} from 'ngx-bootstrap-datetime-popup';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularmaterialModule } from '../material/angularmaterial/angularmaterial.module';
import { RoomsComponent } from './rooms/rooms.component';
import { RecepReportComponent } from './recep-report/recep-report.component';

@NgModule({
  declarations: [GuestComponent, RoomsComponent, RecepReportComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    AngularmaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    DatetimePopupModule.forRoot(),
    
    
    ReceptionRoutingModule
  ],
  exports: [RecepReportComponent]
})
export class ReceptionModule { }
