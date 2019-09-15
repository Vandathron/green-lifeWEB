import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  errorMsg: string = "";
  loginError: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fireDB: AngularFirestore
  ) { }
  
  ngOnInit(
  ) {
  }

  login(){  
    var loggedInStaff;
    this.loginError = false;
    this.authService.login(this.username, this.password)
    .then(success => { 
      console.log(success);
       this.fireDB.collection('staffs').doc(success.user.uid).get()
       .subscribe(data => {
         loggedInStaff = data.data();
         console.log(loggedInStaff);
         if(loggedInStaff.department == "reception"){
           this.router.navigateByUrl("v/reception/guests")
         }
         if(loggedInStaff.department == "admin"){
           this.router.navigateByUrl("v/admin").then(suc => console.log("Navigated successful", suc)).catch(err => console.log("INvalid route"))
         }
       })
      
    }).catch((err: FirebaseError) => {
      if(err.code == "auth/user-not-found"){
        this.errorMsg = "This user does not exist";
        this.loginError = true;
      }else if(err.code == "auth/wrong-password"){
        this.errorMsg = "Wrong password";
        this.loginError = true;
      }
    })
  }

  forgotPassword(){

  }

}
