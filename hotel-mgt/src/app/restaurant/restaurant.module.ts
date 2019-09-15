import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RestaurantRoutingModule } from './restaurant-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RestaurantRoutingModule
  ]
})
export class RestaurantModule { }
