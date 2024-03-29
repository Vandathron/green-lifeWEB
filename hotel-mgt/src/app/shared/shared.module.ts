import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { ReportComponent } from './report/report.component';
import { AngularmaterialModule } from '../material/angularmaterial/angularmaterial.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomDaterangePickerComponent } from './custom-daterange-picker/custom-daterange-picker.component';



@NgModule({
  declarations: [OrdersComponent, ReportComponent, CustomDaterangePickerComponent],
  imports: [
    CommonModule,
    AngularmaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
  
  
  ],exports:[
    OrdersComponent,
    ReportComponent,
  ]
})
export class SharedModule { }
