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
  ) { }

  guestForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: [null, [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    paymentType: ['', [Validators.required]],
    roomNo: [null, [Validators.required]],
    checkInTime: ['', [Validators.required]],
    checkOutTime: ['', [Validators.required]],
    roomID: [null, [Validators.required]]
  });


  ngOnInit() {

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  saveGuest(){
    this.guestForm.addControl('amount', this.fb.control(this.guestForm.get('')))
    this.guestService.saveGuest(this.guestForm.value).then(cb => {
      console.log(cb);
    }).catch(err => console.log("Error"+err))
  }

  openModal(content, options){
    this.modalService.open(content, options);
    this.roomService.getRooms().pipe(
      map(rooms => {
        rooms.forEach(roomDoc => {
          const room = roomDoc.data();
          room.id = roomDoc.id;
          this.emptyRooms.push(room);
        })
      })
    ).subscribe();
  }



}
