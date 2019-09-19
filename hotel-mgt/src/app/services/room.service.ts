import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IRoom } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  

  constructor(
    private fireDB: AngularFirestore
  ) { }

  saveRoom(room: IRoom){
    return this.fireDB.collection("rooms").add(room);
  }

  getRooms(){
    return this.fireDB.collection("rooms").get();
  }

  filterRooms(property: string, value: string){
    return this.fireDB.firestore.collection("rooms").where(property, "==" , value);
  }

  updateRoom(roomID: string, data: {}){
    return this.fireDB.collection("rooms").doc(roomID).update(data);
  }

  getRoom(roomID: string){
    return this.fireDB.collection("rooms").doc(roomID).get();
  }

  
}
