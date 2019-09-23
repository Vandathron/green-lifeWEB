import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { IGuest } from '../../models/guest';
import { MatTableDataSource } from '@angular/material';
import { RoomService } from '../../services/room.service';
import { map } from 'rxjs/operators';
import { GuestService } from '../../services/guest.service';

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
 
  //Tables
  guests: IGuest[] = [];
  
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private roomService: RoomService,
    private guestService: GuestService
  ) { 
    this.getGuests();
  }

  guestForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: [null, [Validators.required]],
    email: ['', [Validators.email]],
    paymentType: ['', [Validators.required]],
    roomNo: [null, [Validators.required]],
    checkInTime: ['', [Validators.required]],
    checkOutTime: ['', [Validators.required]],
    room: [null, [Validators.required]],
    status: [null, [Validators.required]],
    roomPaid: [true, [Validators.required]]
  });


  ngOnInit() {

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }
  getGuests(){
    this.guestService.getGuests().pipe(
      map(guest => {
        guest.docs.map(
          guest => {
            const g = guest.data();
            g.id = guest.id;
            this.roomService.getRoom(g.roomID)
            .pipe(
              map(r => {
                g.roomInfo = r.data();
                this.sortGuests(g);
              })
            ).subscribe();
          }
        )
      })
    ).subscribe();
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
    this.guestForm.addControl("totalBill", this.fb.control(this.guestForm.get("room").value.roomPrice));
    this.guestForm.addControl("paidBill", this.fb.control(this.guestForm.get("roomPaid").value? this.guestForm.get("room").value.roomPrice: 0));
    this.guestForm.addControl("roomID",this.fb.control(this.guestForm.get("room").value.id));
    this.guestForm.addControl("roomNo",this.fb.control(this.guestForm.get("room").value.roomNo));
    this.guestForm.removeControl("room");
    this.guestService.saveGuest(this.guestForm.value).then(cb => {
      this.guestForm.removeControl("totalBill");
      this.guestForm.removeControl("paidBill");
      this.guestForm.removeControl("roomNo");
      this.roomService.updateRoom(this.guestForm.get("roomID").value, {status: this.guestForm.get('status').value})
      .then(suc => {
        this.guestForm.removeControl("roomID");
        this.guestForm.reset();
        this.modalService.dismissAll();
        this.getGuests();
      }).catch(err => console.log(err));
    }).catch(err => console.log("Error"+err))
  }

  openModal(content, options){
    this.guestForm.addControl("room", this.fb.control(null));
    this.modalService.open(content, options);
    this.roomService.filterRooms("status",  "available")
    .get().then(rooms => {
      console.log(rooms.docs)
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
    this.guestService.deleteGuest(guest)
    .then(onSuc => {
      console.log("Deleted successfully");
      this.roomService.updateRoom(guest.roomID, {status: "available"})
      .then(onSuc => this.getGuests()).catch(err => console.log(err));
    })
  }

  checkInGuestMethod(guest){
    
  }

}
