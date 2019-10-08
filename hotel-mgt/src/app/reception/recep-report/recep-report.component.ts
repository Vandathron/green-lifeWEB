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

  queries= [
    {name: "All", value: true, }, {name: "Checked in ", value: "checkedin"}, {name: "Checked out", value: "checkout"}
  ]

  loading: boolean = false;

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
    this.getReports();
  }

  getReports(){
    this.loading = true;
    this.reportService.getGuestReport().toPromise().then(data => {
      data.docs.forEach(doc => {const d = doc.data(); d.id = doc.id; this.guests.push(d)})
      this.loading = false;
   })
  }
 

  report = {
    guestName: "",
    barBill: 0,
    restaurantBill: 0,
    totalBillPaid: 0,
    outStandingBill: 0
  }

  viewGuestReport(content, guest){
    this.guestBarReport = []; this.guestRestaurantReport = [];
    this.selectedGuestReport = guest;
    this.modalService.open(content, {windowClass: 'modal-lg animate', centered: true, });
    this.detailLoading = true;
    if(guest.barBill || guest.restaurantBill)
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

  printReport(report: string){
    var divToPrint = document.getElementById(report);
    var htmlToPrint = '' +
        '<style type="text/css">' +
        'table th {' +
        'padding:0.5em;' +
        'text-align: center;'+
        'border: 1px solid #000;'+
        '}' +
        'table {'+
          'width: 100%;'+
          'border: 1px solid #000;'+
          '}'+
        '</style>';
    htmlToPrint = htmlToPrint+ divToPrint.outerHTML;
    let newWin = window.open("");
    newWin.document.write(htmlToPrint);
    newWin.print();
    newWin.close();
    
  }

  filterReport(selectedQueryType){
    this.loading = true;
    selectedQueryType.value == true? this.getReports():
    this.reportService.queryReportByType(selectedQueryType.value)
    .then(reports => {
      this.guests = [];
      reports.forEach(doc => {
        const d = doc.data();
        d.id = doc.id;
        this.guests.push(d)
      });
      this.loading = false;
    }).catch(err => this.loading  = false);
  } 




}


