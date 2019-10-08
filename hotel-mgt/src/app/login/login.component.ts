import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { IUser } from '../models/user';

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
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fireDB: AngularFirestore
  ) { }
  
  ngOnInit(
  ) {
  }

  login(){  
    this.loading = true;
    var loggedInStaff;
    this.loginError = false;
    this.authService.login(this.username, this.password)
    .then(success => { 
      this.loading = false;
       this.fireDB.collection('staffs').doc(success.user.uid).get()
       .subscribe(data => {
         loggedInStaff = data.data() as IUser;
         loggedInStaff.id = success.user.uid;
         localStorage.setItem("LoggedInUser", JSON.stringify(loggedInStaff))
         switch(loggedInStaff.department){
           case "reception": 
                this.router.navigateByUrl("v/reception");
                break;
          case "restaurant":
                this.router.navigateByUrl("v/restaurant");
                break;
          case "bar":
                this.router.navigateByUrl("v/bar");
                break;
          case "admin":
                this.router.navigateByUrl("v/admin");
                break;
         }
       })
      
    }).catch((err: FirebaseError) => {
      this.loading = false;
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
