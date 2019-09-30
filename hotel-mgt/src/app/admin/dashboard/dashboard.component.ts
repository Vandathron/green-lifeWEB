import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cardData: {
    availableRooms: 0,
    checkIns: 0,
    bookings: 0,
    restaurantSales: 0,
    barSales: 0,
    recepSales: 0
  }

  constructor(
    private roomService: RoomService,
  ) { }

  ngOnInit() {
  }

}
