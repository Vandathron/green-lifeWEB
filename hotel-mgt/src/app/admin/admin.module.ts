import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffComponent } from './staff/staff.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularmaterialModule } from '../material/angularmaterial/angularmaterial.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NouisliderModule } from 'ng2-nouislider';
import { Ng2DropdownModule } from 'ng2-material-dropdown';

@NgModule({
  declarations: [DashboardComponent, StaffComponent],
  imports: [
    CommonModule,
    AngularmaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    NouisliderModule,
    NgSelectModule,
    Ng2DropdownModule
    
  ]
})
export class AdminModule { }
