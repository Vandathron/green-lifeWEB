import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-rest-report',
  templateUrl: './rest-report.component.html',
  styleUrls: ['./rest-report.component.scss']
})
export class RestReportComponent implements OnInit {

   reportType: string = "restaurant";
  constructor(){}


  
 ngOnInit(){

 }
}
