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

  currentTime: number = new Date().getTime()*1000;

  emptyRooms = [];
  bookedRooms = [];
  checkedInRooms = [];

  rooms = [];
  room = this.fb.group({
    roomNo: [null, [Validators.required]],
    roomPrice: [null, [Validators.required]],
    status: ['available', [Validators.required]]
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
  saveRoom(){
    this.room.addControl('roomType', this.fb.control(this.selectedRoomType));
    this.roomService.saveRoom(this.room.value)
    .then(cb => {
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

  getRooms(){
    this.guestService.getGuests().pipe(
      map(guests => {
        guests.docs.map(doc => this.sortRooms(doc.data()))
      })
    ).subscribe();

    this.roomService.getRooms().pipe(
      map(rooms => {
        this.emptyRooms = rooms.docs.filter(room => room.data().status == "unavailable");
      })
    ).subscribe();
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

  formatD(date: string){
    return formatDate(date, 'mm-dd hh:mm a', 'en')
  }

  isCheckoutDue(guest: IGuest){
    return this.currentTime > ( new Date(guest.checkOutTime).getTime() * 1000);
  }

}
