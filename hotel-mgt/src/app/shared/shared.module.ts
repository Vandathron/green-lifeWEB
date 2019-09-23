import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { ReportComponent } from './report/report.component';
import { AngularmaterialModule } from '../material/angularmaterial/angularmaterial.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [OrdersComponent, ReportComponent],
  imports: [
    CommonModule,
    AngularmaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  
  ],exports:[
    OrdersComponent,
    ReportComponent,
  ]
})
export class SharedModule { }
