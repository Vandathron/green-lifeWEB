import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { map } from 'rxjs/operators';
import { IItem } from '../../models/Order';
import { IGuest } from '../../models/guest';
import { GuestService } from '../../services/guest.service';
import { ReportService } from '../../services/report.service';
// import { AngularFirestore,   AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { isUndefined } from 'util';

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
  orderIsProcesssed: boolean = false;
  orderIsByGuest: boolean;
  placeOrders = [];
  totalValue: number = 0;
  @Input("orderType") orderType: string;


  
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
    private reportService: ReportService,
    private guestService: GuestService,
  ) {
   }

  ngOnInit() {
    this.loadGuests();
    this.getItems();
  }

  saveItem(){
    this.orderForm.addControl("itemType", this.fb.control(this.orderType));
    this.orderService.addItem(this.orderForm.value).then(data => {
      this.dismissModal();
      this.orderForm.removeControl("itemType");
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
    this.totalValue = 0;
    this.orderedItems = [];
    this.selectedItems.value.forEach(item => {
      item.itemQuantity = 1;
      this.orderedItems.push({
        itemName: item.itemName, itemPrice: item.itemPrice, itemQuantity: 1
      })
    this.calculateOrderTotal(item);
    }
    );
  }

  getItems(){
    this.savedItems = [];
    this.orderService.getItems(this.orderType)
    .then(items => {
      items.forEach(doc => {
        const d = doc.data() as IItem;
        d.id = doc.id;
        this.savedItems.push(d);
      })
    })
  }

  loadGuests(){
    this.guestService.queryGuest("status", "checkedin").
      then(guests => {
        guests.forEach(guest => {
          const g = guest.data();
          g.id = guest.id;
          this.guests.push(g);
        });
      })
  }

  reset(){
    this.selectedGuest.setValue(null);
    this.selectedItems.setValue(null);
    this.orderedItems = [];
    this.placeOrders = [];
    this.totalValue = 0;
  }

  printOrder(){
    this.orderIsProcesssed = true;
        var report = {
          guestName: this.selectedGuest.value.name,
          items: this.orderedItems,
          totalPrice: this.totalValue,
          reportType: this.orderType,
          date: new Date()
        }
        this.reportService.setReport(report, this.selectedGuest.value.id).subscribe(cb => {
          console.log("successful!")
          this.orderIsProcesssed = false;
          //When above is successful, update guest balance
          this.guestService.updateGuest(this.selectedGuest.value.id, {
            paidBill: firestore.FieldValue.increment(this.isBillPlaced? 0: this.totalValue),
            totalBill: firestore.FieldValue.increment(this.totalValue),
            restaurantBill:  firestore.FieldValue.increment(this.orderType == "restaurant"?this.totalValue: 0),
            barBill: firestore.FieldValue.increment(this.orderType == "bar"? this.totalValue: 0)
          })
          
          .then(onUpdated => this.reset()).catch(onErro => console.log(onErro));
        })

  }

  deleteSavedItem(item){
    this.orderService.deleteItem(item.id)
    .then(cb => this.getItems())
    .catch(err => console.log("Error deleting", err));
  }

  calculateOrderTotal(item){
      this.totalValue += item.itemPrice;
  }

  increaseTotal(item){
    this.totalValue += item.itemPrice;
    item.itemQuantity +=1;
  }
  decreaseTotal(item){
    item.itemQuantity > 1? (this.totalValue -= item.itemPrice, item.itemQuantity -=1): console.log("cannot");
  }


}
