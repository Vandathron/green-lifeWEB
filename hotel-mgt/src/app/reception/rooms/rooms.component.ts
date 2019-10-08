import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { map } from 'rxjs/operators';
import { GuestService } from '../../services/guest.service';
import { IRoomGuest } from '../../models/room';
import { formatDate } from '@angular/common';
import { IGuest } from '../../models/guest';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  selectedRoomType;
  roomTypes = [
    "Single", "Double", "Triple", "Family"
  ];
  roomsInfo: IRoomGuest[] = [];
  bookedRoomNo;
  loading: boolean = false;

  currentTime: number = new Date().getTime()*1000;

  emptyRooms = [];
  bookedRooms = [];
  checkedInRooms = [];

  rooms = [];
  room = this.fb.group({
    roomNo: [null, [Validators.required]],
    roomPrice: [null, [Validators.required]],
    status: ['available']
  })

  bookForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: [null, [Validators.required]],
    email: [''],
    checkInTime: ['', [Validators.required]],
    checkOutTime: ['', [Validators.required]],
  })


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private roomService: RoomService,
    private guestService: GuestService
  ) {
    this.getRooms();
    
   }

  ngOnInit() {
  }

  deleteRoom(room){
    this.loading = true;
    this.roomService.deleteRoom(room.id).then(suc => {
      this.getRooms();
    }).catch(err => this.loading = false)
  }
  saveRoom(){
    this.room.addControl('roomType', this.fb.control(this.selectedRoomType));
    this.roomService.saveRoom(this.room.value)
    .then(cb => {
      this.room.removeControl('roomType');
      this.closeModal();
      this.getRooms();
      console.log(cb.id + "=> " + "Saved successfully");
    }).catch(err => console.log("Error save", err));
  }

  bookRoom(){
    console.log(this.bookForm.value);
  }

  
  closeModal(){
    this.modalService.dismissAll();
  }
  open(content, options){
    this.modalService.open(content, {centered: true, windowClass: options.windowClass});
  }

  resetRooms(){
    this.bookedRooms = [];
    this.checkedInRooms = [];
    this.emptyRooms = [];
  }

  getRooms(){
    this.resetRooms();
    this.loading = true;
    this.guestService.getGuests().then(
      guests => {
        guests.docs.map(doc => {const d = doc.data(); d.id = doc.id;this.sortRooms(d)})
      this.loading = false;
      }
    ).catch(err => this.loading = false)
    this.roomService.queryRoom("status", "available").then(docs => docs.forEach(doc =>{ const d = doc.data(); d.id = doc.id; this.emptyRooms.push(d)}))
  }

  sortRooms(guest){
    switch(guest.status){
      case "booked":
        this.bookedRooms.push(guest);
        break;
      case "checkedin":
        this.checkedInRooms.push(guest);
        break;
      default:
        console.log("This should not show");
    }
  }

  mapRoom(doc){
    const roomData = doc.data();
    this.guestService.joinGuestsAndRooms("roomID", doc.id)
    .then(guests => {
      guests.docs.forEach(guest => { 
        const guestData = guest.data();
        this.roomsInfo.push({
          guestName: guestData.name,
          roomNo: roomData.roomNo,
          status: guestData.status,
          checkInTime: guestData.checkin,
          checkOutTime: guestData.checkout,
        });
      })
    }).catch(err => console.log(err));
  }

  formatD(date){
    if(typeof date == "string"){
      return formatDate(date, 'dd MMM yy hh:mm a', 'en');
    }else{
      return formatDate(new Date(date.seconds*1000), 'dd MMM yy hh:mm a', 'en');
    }
  }

  isCheckoutDue(guest: IGuest){
    return this.currentTime > ( new Date(guest.checkOutTime).getTime() * 1000);
  }

}
