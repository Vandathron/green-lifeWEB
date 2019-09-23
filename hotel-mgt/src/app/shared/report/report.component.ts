import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input("reportType") reportType: string;
  private reports = [];
  constructor(
    private reportService: ReportService
  ) { 
  }

  ngOnInit() {
    this.getMyReport();
  }

  getMyReport(){
    this.reportService.queryReport("reportType", this.reportType)
    .then(reports => {
      reports.forEach(doc => {
        const d = doc.data();
        d.id = doc.id;
        this.reports.push(d);
      });
    }).catch(err => console.log(err));
  }

  getTotalItemPrice(items): number{
    let total = 0;
    items.forEach(item => {
      total += item.itemPrice
    });
    return total;
  }


}
