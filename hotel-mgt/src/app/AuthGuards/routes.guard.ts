import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesGuard implements CanActivate {
  user;
  localUser;

  constructor(private fireAuth: AngularFireAuth, private router: Router, private authService: AuthService){
    this.fireAuth.authState.subscribe(user => {
      user? this.user = user: this.user = undefined;
    })
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
      this.localUser = JSON.parse(localStorage.getItem("LoggedInUser"));

      if(this.user && (next.data.role.includes(this.localUser.department || next.data.role == null || next.data.role.length ===0))) {return true}
      else if(!this.user){this.router.navigateByUrl("/login")};
  }
 
}
