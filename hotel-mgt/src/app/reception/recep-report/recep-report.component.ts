import { Component, OnInit } from '@angular/core';
import { IGuest } from '../../models/guest';

@Component({
  selector: 'app-recep-report',
  templateUrl: './recep-report.component.html',
  styleUrls: ['./recep-report.component.scss']
})
export class RecepReportComponent implements OnInit {

  constructor() { }

  guests: IGuest[] = [];

  ngOnInit() {
  }



}
