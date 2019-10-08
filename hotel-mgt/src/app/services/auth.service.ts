import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  localUser;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) { 

  }

  deleteUser(){
    var user = this.fireAuth.auth.currentUser;
    return user.delete();
  }

  onlogout(){
    this.fireAuth.auth.signOut().then(logOutSuccessful => {
      localStorage.removeItem("LoggedInUser");
      this.router.navigateByUrl("/login");
    })
  }

  login(username: string, password: string){
    return this.fireAuth.auth.signInWithEmailAndPassword(username, password);
  };

  isAuthorized(roles: string[]): boolean{
    this.localUser = JSON.parse(localStorage.getItem("LoggedInUser"));
    console.log(this.localUser);
    if(roles == null || roles.length  === 0){
      return true;
    }

    return roles.includes(this.localUser.department);
  }
}
  