import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { IGuest } from '../../models/guest';
import { MatTableDataSource } from '@angular/material';

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
  guest: IGuest[] = [];
  displayedCols: string[] = ["name", "phone", "email", "checkInTime", "checkOutTime", "roomNo", "paid", ]
  
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }



  guestForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: [null, [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    paymentType: ['', [Validators.required]],
    roomNo: [null, [Validators.required]],
    checkInTime: ['', [Validators.required]],
    checkOutTime: ['', [Validators.required]],
    paid: [false]
  });


  ngOnInit() {
  this.guestTableData = new MatTableDataSource(this.guest);

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  openModal(content, options){
    this.modalService.open(content, options);
  }

  applyFilter(filterValue){
    this.guestTableData.filter = filterValue.trim().toLowerCase();
  }
}
