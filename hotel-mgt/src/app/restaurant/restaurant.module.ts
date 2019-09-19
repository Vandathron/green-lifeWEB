import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RestaurantRoutingModule } from './restaurant-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RestReportComponent } from './rest-report/rest-report.component';
import { PosComponent } from './pos/pos.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularmaterialModule } from '../material/angularmaterial/angularmaterial.module';

@NgModule({
  declarations: [OrdersComponent, RestReportComponent, PosComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    AngularmaterialModule,
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
