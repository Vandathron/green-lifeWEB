import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { ReportService } from '../../services/report.service';
import { StaffService } from '../../services/staff.service';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/firestore';
import * as numeral from 'numeral';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cardData= {
    availableRooms: 0,
    checkIns: 0,
    bookings: 0,
    restaurantSales: 0,
    barSales: 0,
    recepSales: 0
  }

  constructor(
    private roomService: RoomService,
    private reportService: ReportService,
    private staffService: StaffService
  ) { 
    this.getStaffSales();
   }

  ngOnInit() {
  }

  getDashboardData(){
    // this.reportService.getDashboardSales("department", )
  }

  getStaffSales(){
    this.staffService.getStaffs().pipe(
      map(staffs => {
        this.getTotals(staffs)
      })
    ).subscribe();
  }

  getTotals(staffs: DocumentChangeAction<any>[]){
    staffs.forEach(staff => {
      const staffData = staff.payload.doc.data();
      switch(staffData.department){
        case "restaurant":
          this.cardData.restaurantSales += staffData.totalSale
        break;
        case "bar":
          this.cardData.barSales += staffData.totalSale;
        break;
        case "reception":
          this.cardData.recepSales += staffData.totalSale;
        break;
        default:
          console.log("Admin not recorded!");
      }
    })
  }
  formatPrice(price, dropDecimals = false) {
    return numeral(price).format(dropDecimals ? '0,0' : '0,0.00');
  }


}
