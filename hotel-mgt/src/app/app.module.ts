import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { HttpClientModule } from "@angular/common/http";
import { NouisliderModule } from "ng2-nouislider";
import { NgSelectModule } from "@ng-select/ng-select";
import { TagInputModule } from "ngx-chips";
import { SweetAlert2Module } from "@toverux/ngx-sweetalert2";

import {AngularFireStorageModule} from '@angular/fire/storage';


// *******************************************************************************
// NgBootstrap

import { NgbModule, NgbDateAdapter, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


// *******************************************************************************
// App

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { LayoutModule } from "./layout/layout.module";

// *******************************************************************************
// Pages

import { CustomDaterangePickerComponent } from './shared/custom-daterange-picker/custom-daterange-picker.component';
import { CalendarModule, CalendarDateFormatter, DateAdapter, CalendarUtils } from 'angular-calendar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularmaterialModule } from "./material/angularmaterial/angularmaterial.module";
import { LoginComponent } from './login/login.component';
import { AuthService } from "./services/auth.service";
import { AngularFireAuthModule } from "@angular/fire/auth";
import {  AngularFirestoreModule } from "@angular/fire/firestore";
import { StaffService } from "./services/staff.service";
import { SharedModule } from "./shared/shared.module";



// *******************************************************************************
//

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // Pages

  ],

  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    

    NgxChartsModule,
    PerfectScrollbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NouisliderModule,
    NgSelectModule,
    TagInputModule,
    SweetAlert2Module.forRoot(),
    // App
    AppRoutingModule,
    LayoutModule,
    AngularmaterialModule,
    SharedModule
    ,

    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  entryComponents: [],

  providers: [
    Title,
    AppService,
    AuthService,
    StaffService
  ],

  bootstrap: [
    AppComponent
  ], 
  exports: [
  ]
})
export class AppModule {}
