import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from '../models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

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
        firstName: staff.firstName,
        lastName: staff.lastName,
        department: staff.department,
        phone: staff.phone,
        email: staff.email,
        password: staff.password,
        username: staff.username
      })
    })
  }
}
