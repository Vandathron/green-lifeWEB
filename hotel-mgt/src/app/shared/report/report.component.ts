import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input("reportType") reportType: string;
   reports = [];
  constructor(
    private reportService: ReportService
  ) { 
  }

  ngOnInit() {
    this.getMyReport();
  }

  getMyReport(){
    this.reportService.getReports()
    .then(reports => {
      reports.docs.forEach(doc => {
        doc.data().reports.forEach(report => {
          if(report.reportType == "bar" && this.reportType=="bar"){
            this.reports.push(report);
          }else if(report.reportType=="restaurant" && this.reportType=="restaurant"){
            this.reports.push(report);
          } 
        })
      })
      console.log(this.reports);
    }).catch(err => console.log(err));
  }

  getTotalItemPrice(items): number{
    let total = 0;
    items.forEach(item => {
      total += item.itemPrice
    });
    return total;
  }

  filterReport(guest){
    this.reportService.filterGuest("guestName", guest.guestName )
    .then(reports => {
      this.reports = [];
      reports.forEach(doc => {
        const d = doc.data();
        d.id = doc.id;
        this.reports.push(d)
      })
    }).catch(err => console.log("error ", err));
  }


}
