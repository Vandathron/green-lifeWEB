import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderForm = this.fb.group({
    itemName: ['', [Validators.required]],
    price: [null, [Validators.required]]
  });

  placeOrderForm = this.fb.group({
    customerName: ['', [Validators.required]],
    items: this.fb.array([this.createItems()])

  });
  items: FormArray;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }


  saveItem(){
    console.log(this.orderForm.value);
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



}
