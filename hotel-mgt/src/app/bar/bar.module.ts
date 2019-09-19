import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarRoutingModule } from './bar-routing.module';
import { BarReportComponent } from './bar-report/bar-report.component';
import { BarPosComponent } from './bar-pos/bar-pos.component';

@NgModule({
  declarations: [BarReportComponent, BarPosComponent],
  imports: [
    CommonModule,
    BarRoutingModule
  ]
})
export class BarModule { }
