import { Component, OnInit } from '@angular/core';
import { IGuest } from '../../models/guest';
import { ReportService } from '../../services/report.service';
import { map } from 'rxjs/operators';
import { IReceptionReport } from '../../models/report';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import * as numeral from 'numeral';

@Component({
  selector: 'app-recep-report',
  templateUrl: './recep-report.component.html',
  styleUrls: ['./recep-report.component.scss']
})
export class RecepReportComponent implements OnInit {


  constructor(
    private reportService: ReportService,
    private modalService: NgbModal
  ) {
    // this.getMyReport();
   }

   detailLoading: boolean = false;

   selectedGuestReport;
   guestBarReport = [];
   guestRestaurantReport = [];

  guests: any[] = [];

  ngOnInit() {
    this.reportService.getGuestReport().toPromise().then(data => {
       data.docs.forEach(doc => {const d = doc.data(); d.id = doc.id; this.guests.push(d)})
    })
  }
 

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

  viewGuestReport(content, guest){
    this.guestBarReport = []; this.guestRestaurantReport = [];
    this.selectedGuestReport = guest;
    this.modalService.open(content, {windowClass: 'modal-lg animate', centered: true, });
    this.detailLoading = true;
    if(guest.barBill)
    this.reportService.getReportByGuest(guest.id).pipe(
      map(guests => {
       const reports =  guests.data().reports;
        this.guestBarReport = reports.filter(report => report.reportType == "bar");
        this.guestRestaurantReport = reports.filter(report => report.reportType == "restaurant");
      })
    ).subscribe(data => this.detailLoading = false);
  }

  formatD(date){
    if(typeof date == "string"){
      return formatDate(date, 'dd MMM yyyy hh:mm a', 'en');
    }else{
      return formatDate(new Date(date.seconds*1000), 'dd MMM yyyy hh:mm a', 'en');
    }
  }
  formatPrice(price, dropDecimals = false) {
    return numeral(price).format(dropDecimals ? '0,0' : '0,0.00');
  }

  printReport(){
    
  }


}


