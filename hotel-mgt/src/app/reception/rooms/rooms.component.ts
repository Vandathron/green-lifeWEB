import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { map } from 'rxjs/operators';

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
  emptyRooms = [];
  bookedRoomNo;

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
    private roomService: RoomService
  ) { }

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
    this.roomService.getRooms().pipe(
      map(rooms => {
        rooms.forEach(doc => {
          const data = doc.data()
          data.id = doc.id;
          console.log(data);
          this.rooms.push(data);
        })
      })
    )
  }

}
