import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) { 

  }

  deleteUser(email, password){
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  onlogout(){
    this.fireAuth.auth.signOut().then(logOutSuccessful => {
      localStorage.removeItem("LoggedInUser")
      console.log("Logged out successfuly");
    })
  }

  login(username: string, password: string){
    return this.fireAuth.auth.signInWithEmailAndPassword(username, password)
  };
}
  