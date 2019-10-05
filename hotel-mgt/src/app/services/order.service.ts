import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private fireStore: AngularFirestore
  ) { 

  }

  addItem(item){
    return this.fireStore.collection('items').add(item);
  }

  getItems(value: string){
    return this.fireStore.firestore.collection("items").where("itemType", "==", value).get();
  }

  deleteItem(itemID){
    return this.fireStore.collection("items").doc(itemID).delete();
  }

  updateStaffSale(staffID, data){
    return this.fireStore.collection("staffs").doc(staffID).update(data);
  }
  
  //Bar items

}
