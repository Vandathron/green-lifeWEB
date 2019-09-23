import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RestaurantRoutingModule } from './restaurant-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RestReportComponent } from './rest-report/rest-report.component';
import { PosComponent } from './pos/pos.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularmaterialModule } from '../material/angularmaterial/angularmaterial.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ RestReportComponent, PosComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AngularmaterialModule,
    RestaurantRoutingModule
  ],
  exports: []
})
export class RestaurantModule { }
