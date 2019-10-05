import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) { 

  }

  deleteUser(email, password){
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
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
}
  