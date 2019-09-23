import { Component, OnInit } from '@angular/core';
import { IGuest } from '../../models/guest';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-recep-report',
  templateUrl: './recep-report.component.html',
  styleUrls: ['./recep-report.component.scss']
})
export class RecepReportComponent implements OnInit {


  constructor(
    private reportService: ReportService
  ) { }

  guests: IGuest[] = [];

  ngOnInit() {
  }

  getMyReport(){
    this.reportService.getAllReports()
    
  }

}
