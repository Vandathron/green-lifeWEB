import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IGuest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(
    private fireStore: AngularFirestore
  ) { }


  getGuests(){
    return this.fireStore.collection('guests').get();
  }
  saveGuest(guest: IGuest){
    return this.fireStore.collection('guests').add(guest);
  }

  joinGuestsAndRooms(property: string, value: string){
    return this.fireStore.firestore.collection("guests").where(property, "==", value).get();
  }
}
