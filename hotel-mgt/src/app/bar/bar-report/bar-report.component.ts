import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-report',
  templateUrl: './bar-report.component.html',
  styleUrls: ['./bar-report.component.scss']
})
export class BarReportComponent implements OnInit {

  reportType: string = "bar";
  constructor() { }

  ngOnInit() {
  }

}
