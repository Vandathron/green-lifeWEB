import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private fireDB: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) { }

  saveStaff(staff: IUser){
     return this.fireAuth.auth.createUserWithEmailAndPassword(staff.email, staff.password)
    .then(cred => {
      return this.fireDB.collection('staffs').doc<IUser>(cred.user.uid).set({
        id: cred.user.uid,
        firstName: staff.firstName,
        lastName: staff.lastName,
        department: staff.department,
        phone: staff.phone,
        email: staff.email,
        username: staff.username,
      })
    })
  }

  getStaffs(){
     return this.fireDB.collection("staffs").snapshotChanges();
  }

  deleteStaff(id){
    return this.fireDB.collection("staffs").doc(id).delete();
  }
  
}
