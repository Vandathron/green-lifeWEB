import { Component, OnInit } from '@angular/core';
import { IGuest } from '../../models/guest';
import { ReportService } from '../../services/report.service';
import { map } from 'rxjs/operators';
import { IReceptionReport } from '../../models/report';

@Component({
  selector: 'app-recep-report',
  templateUrl: './recep-report.component.html',
  styleUrls: ['./recep-report.component.scss']
})
export class RecepReportComponent implements OnInit {


  constructor(
    private reportService: ReportService
  ) {
    // this.getMyReport();
   }

  guests: any[] = [];

  ngOnInit() {
    this.reportService.getGuestReport().toPromise().then(data => {
       data.docs.forEach(doc => this.guests.push(doc.data()))
    })
  }

  // getMyReport(){
  //   this.reportService.getAllReports()
  //   .pipe(
  //     map(guestReports => {
  //       guestReports.docs.forEach(doc => {
  //         const reports = doc.data() as IReceptionReport;
  //         console.log(reports);
  //         this.structureReport(reports);
  //       })
  //     })
  //   ).subscribe();
  // }

  // temReports: IGuestReport[] = [];
 

  report = {
    guestName: "",
    barBill: 0,
    restaurantBill: 0,
    totalBillPaid: 0,
    outStandingBill: 0
  }

  // structureReport(report: IReceptionReport){
  //   report.reports.forEach(rep => {
  //     if(rep.reportType == "bar"){
  //       this.report.barBill += rep.totalPrice
        
  //     }else if(rep.reportType == "restaurant"){
  //       this.report.restaurantBill += rep.totalPrice
  //     }
  //     this.report.guestName = rep.guestName;
  //   })
  //   this.temReports.push(this.report);
  // } 

}
// interface IGuestReport{
//     guestName: string;
//     barBill: number,
//     restaurantBill: number,
//     totalBillPaid: number,
//     outStandingBill: number
// }