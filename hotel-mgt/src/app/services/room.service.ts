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

  
}
