import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../../services/report.service';
import * as numeral from 'numeral';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input("reportType") reportType: string;
   reports = [];
   today = new Date( new Date().setHours(0,0,0,0)).getTime()/1000;
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
          if(report.date.seconds > this.today)
          if(report.reportType == "bar" && this.reportType=="bar"){
            this.reports.push(report);
          }else if(report.reportType=="restaurant" && this.reportType=="restaurant"){
            this.reports.push(report);
          } 
        })
      })
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

  formatPrice(price, dropDecimals = false) {
    return numeral(price).format(dropDecimals ? '0,0' : '0,0.00');
  }

  printReport(){
    var divToPrint = document.getElementById('daily-report');
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

}
