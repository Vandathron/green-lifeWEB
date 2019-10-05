import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { IGuest } from '../../models/guest';
import { MatTableDataSource } from '@angular/material';
import { RoomService } from '../../services/room.service';
import { map } from 'rxjs/operators';
import { GuestService } from '../../services/guest.service';
import { formatDate } from '@angular/common';
import { ReportService } from '../../services/report.service';
import { firestore } from 'firebase';
import * as numeral from 'numeral';


@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  
  styleUrls: ['./guest.component.scss']
})
export class GuestComponent implements OnInit, AfterViewInit {

  selectedPaymentType;
  checkInGuest = [];
  bookedGuest = [];
  guestPaid: boolean = true;

  paymentTypes = [
    {
      name: "card",
      id: 1
    },
    {
      name: "Transfer",
      id: 2
    },
    {
      name: "Cash",
      id: 3
    }
  ];
  selectedRoom;
  emptyRooms = [];
  guestTableData;
  roomPrice  = 0;
  savingGuest: boolean = false;
 
  //Tables
  guests: IGuest[] = [];
  
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private roomService: RoomService,
    private guestService: GuestService,
    private reportService: ReportService
  ) { 
    this.getGuests();
  }

  guestForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: [null, [Validators.required]],
    email: ['', [Validators.email]],
    paymentType: ['', [Validators.required]],
    checkInTime: ['', [Validators.required]],
    checkOutTime: ['', [Validators.required]],
    room: [null, [Validators.required]],
    status: [null, [Validators.required]],
    roomPaid: [true, [Validators.required]],
    roomPrice: [null, [Validators.required]]
  });


  ngOnInit() {

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }
  getGuests(){
    this.savingGuest = true;
    this.resetData();
    this.guestService.getGuests().then(guest => {
      guest.docs.map(
        guest => {
          const g = guest.data();
          g.id = guest.id;
          this.roomService.getRoom(g.roomID)
          .pipe(
            map(r => {
              g.roomInfo = r.data();
              this.sortGuests(g);
              this.savingGuest = false;
            })
          ).subscribe();
    })
  }).catch(err => console.log(err));
  }

  sortGuests(guest){
    switch(guest.status){
      case "booked":
        this.bookedGuest.push(guest);
        break;
      case "checkedin":
        this.checkInGuest.push(guest);
        break;
      default:
        console.log("This is an error");
        break;
    }
  }

  saveGuest(){
    console.log(this.guestForm.value);

    this.guestForm.addControl("totalBill", this.fb.control(this.guestForm.get("roomPrice").value));
    this.guestForm.addControl("paidBill", this.fb.control(this.guestForm.get("roomPaid").value? this.guestForm.get("roomPrice").value: 0));
    this.guestForm.addControl("roomID",this.fb.control(this.guestForm.get("room").value.id));
    this.guestForm.addControl("roomNo",this.fb.control(this.guestForm.get("room").value.roomNo));
    this.guestForm.removeControl("room");
    this.savingGuest = true;
    this.guestService.saveGuest(this.guestForm.value).then(cb => {
      // this.reportService.saveToReport({
      //   guestName: this.guestForm.value.name,
        
      // })
      this.guestForm.removeControl("totalBill");
      this.guestForm.removeControl("paidBill");
      this.guestForm.removeControl("roomNo");
      this.roomService.updateRoom(this.guestForm.get("roomID").value, {status: this.guestForm.get('status').value})
      .then(suc => {
        this.checkInGuest = [];
        this.bookedGuest = [];
        this.guestForm.removeControl("roomID");
        this.guestForm.reset();
        this.modalService.dismissAll();
        this.getGuests();
      }).catch(err => console.log(err));
    }).catch(err => console.log("Error"+err))
  }

  openModal(content, options){
    this.emptyRooms = [];
    this.guestForm.addControl("room", this.fb.control(null));
    this.modalService.open(content, options);
    this.roomService.filterRooms("status",  "available")
    .get().then(rooms => {
      rooms.forEach(room => {
        const r = room.data();
        r.id = room.id;
        this.emptyRooms.push(r);
      })
    }).catch(err => console.log("Error ", err))
  }

  resetData(){
    this.checkInGuest = [];
    this.bookedGuest = [];
    this.emptyRooms = [];
  }

  cancelBooking(guest){
    this.savingGuest = true;
    this.guestService.deleteGuest(guest)
    .then(onSuc => {
      this.savingGuest = false;
      console.log("Deleted successfully");
      this.roomService.updateRoom(guest.roomID, {status: "available"})
      .then(onSuc => this.getGuests()).catch(err => console.log(err));
    })
  }

  checkInGuestMethod(guest){
    
  }

  checkOutGuest(guest){
    this.savingGuest = true;
    this.guestService.updateGuest(guest.id, {
      status: "checkout"
    }).then(cb => {
      this.savingGuest = false;
      this.roomService.updateRoom(guest.roomID, {status: "available"}).then(cb => {
      })
      this.getGuests();
    })
    
  }
  formatD(date){
    if(typeof date == "string"){
      return formatDate(date, 'dd MMM yyyy hh:mm a', 'en');
    }else{
      return formatDate(new Date(date.seconds*1000), 'dd MMM yyyy hh:mm a', 'en');
    }
  }

  saveReport(){

  }

  updateBill(guest){
    this.savingGuest = true;
    this.guestService.updateGuest(guest.id, {
      paidBill: guest.totalBill
    }).then(res => {
      this.savingGuest = false;
      this.getGuests();
    })
  }

  formatPrice(price, dropDecimals = false) {
    return numeral(price).format(dropDecimals ? '0,0' : '0,0.00');
  }


}
