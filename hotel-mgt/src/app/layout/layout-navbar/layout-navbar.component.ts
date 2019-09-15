import { Component, Input, HostBinding } from '@angular/core';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import { Router } from '@angular/router';
import{AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [':host { display: block; }']
})
export class LayoutNavbarComponent {
  isExpanded = false;
  isRTL: boolean;
  Name:any;

  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar') private hostClassMain = true;

  constructor(private appService: AppService, private layoutService: LayoutService,public router:Router,private authservice:AuthService) {
    this.isRTL = appService.isRTL;
  // if(this.authservice.checkstatus()){
    // this.Name=localStorage.getItem("Name");
  // }
    
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }
  onlogout(){
this.authservice.onlogout();
}
  goToProfile(){
    this.router.navigateByUrl('/layout/profile');
  }
}
