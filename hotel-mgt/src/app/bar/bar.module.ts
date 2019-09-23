import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarRoutingModule } from './bar-routing.module';
import { BarReportComponent } from './bar-report/bar-report.component';
import { BarPosComponent } from './bar-pos/bar-pos.component';
import { RestaurantModule } from '../restaurant/restaurant.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BarReportComponent, BarPosComponent],
  imports: [
    CommonModule,
    BarRoutingModule,
    SharedModule
  ]
})
export class BarModule { }
