import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

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
  })

  bookForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: [null, [Validators.required]],
    email: [''],
    
  })


  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }
  saveRoom(){

  }

  
  open(content, options){
    this.modalService.open(content, {centered: true, windowClass: options.windowClass});
  }

}
