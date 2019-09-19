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
    return this.fireStore.collection('restaurant-items').add(item);
  }

  getItems(){
    return this.fireStore.collection('restaurant-items').snapshotChanges();
  }

  deleteItem(item){
    return this.fireStore.collection("restaurant-items").doc(item.id).delete();
  }
}
