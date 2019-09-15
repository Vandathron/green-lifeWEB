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

  onlogout(){

  }

  login(username: string, password: string){
    return this.fireAuth.auth.signInWithEmailAndPassword(username, password)
  };
}
  