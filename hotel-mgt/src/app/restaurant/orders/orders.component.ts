import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { map } from 'rxjs/operators';
import { IItem } from '../../models/Order';
import { IGuest } from '../../models/guest';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  guestName: string  = "";
  isBillPlaced: boolean = true;
  savedItems: IItem[];
  loaded: boolean = false;
  orderIsByGuest: boolean;
  placeOrders = [];



  
  guests = [];

  selectedGuest = new FormControl(null, [Validators.required]);
  
  selectedItems = new FormControl();
  orderedItems = [];

  orderForm = this.fb.group({
    itemName: ['', [Validators.required]],
    itemPrice: [null, [Validators.required]]
  });

  placeOrderForm = this.fb.group({
    customerName: ['', [Validators.required]],
    items: this.fb.array([this.createItems()])

  });
  items: FormArray;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private orderService: OrderService, 
    private guestService: GuestService
  ) {
    this.getItems();
   }

  ngOnInit() {
    this.loadGuests();
  }

  saveItem(){
    this.orderService.addItem(this.orderForm.value).then(data => {
      this.dismissModal();
      this.getItems();
    }).catch(err => console.log(err))
  }
  dismissModal(){
    this.modalService.dismissAll();
  }

  createItems(): FormGroup{
    return this.fb.group({
      itemName: ['', [Validators.required]],
      itemPrice: [null, Validators.required]
    });
  }

  addItem(){
    this.items = this.placeOrderForm.get('items') as FormArray;
    this.items.push(this.createItems());
  }

  placeOrder(): void{
    console.log(this.placeOrderForm.value);
  }

  open(content,options){
    this.modalService.open(content, options);
  }

  addToOrderView(){
    this.orderedItems = this.selectedItems.value;
    
  }

  getItems(){
    this.savedItems = [];
    this.orderService.getItems().pipe(
      map(changes => {
        changes.map( data => {
          const item = data.payload.doc.data() as IItem;
          item.id = data.payload.doc.id;
          console.log(item);
          this.savedItems.push(item);
        })
        // this.loaded = true;
      })
    ).subscribe();
  }

  loadGuests(){
    this.guestService.getGuests().pipe(
      map(guests => {
        guests.forEach(guest => {
          const g = guest.data();
          g.id = guest.id;
          this.guests.push(g);
        });
      })
    ).subscribe();
  }


  printOrder(){

  }

  deleteSavedItem(item){
    this.orderService.deleteItem(item.id)
    .then(cb => console.log("Successfully deleted " +cb))
    .catch(err => console.log("Error deleting", err));
  }



}
