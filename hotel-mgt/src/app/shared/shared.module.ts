import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{CustomDaterangePickerComponent} from './custom-daterange-picker/custom-daterange-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [CustomDaterangePickerComponent],
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],exports:[
    CustomDaterangePickerComponent
  ]
})
export class SharedModule { }
