import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { IUser } from '../../models/user';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as numeral from 'numeral';
import { FirebaseError } from 'firebase';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss', '../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss','../../../vendor/libs/ng-select/ng-select.scss','../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss']
})
export class StaffComponent implements OnInit {

  selectedDepartment = "bar";
   departments = ["admin", "reception", "restaurant", "bar"
  ];
  loading: boolean = false;
  iconLoaded: boolean = false;
  emailAlreadyInUse: boolean = false;
  initialStaffTotalSale = 0;


  staffs: IUser[] = [];
  selectedStaff;

  staffForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
  })

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private staffService: StaffService,
    private authService: AuthService,
    // private auth: AngularFireAuth
  ) { 
    this.getStaffs();
  }

  ngOnInit() {
  }


  openModal(content, options, data?){
    this.staffForm.addControl("totalSale", this.fb.control(0));
    this.selectedStaff = data;
    this.modalService.open(content, {size: 'lg', backdrop: true, centered: true})
  }

  addStaff(){
    this.loading = true;
    this.staffForm.patchValue({totalSale: 0});
    console.log(this.staffForm.value);
    this.staffForm.addControl('department', this.fb.control(this.selectedDepartment));
    this.staffService.saveStaff(this.staffForm.value)
    .then(suc => {
      this.staffForm.removeControl("totalSale");
      this.modalService.dismissAll();
      this.staffForm.removeControl('department');
      this.staffForm.reset();
      this.getStaffs();
    }).catch((err: FirebaseError) => {
      err.code == "auth/email-already-in-use"? this.emailAlreadyInUse = true: "";
      this.loading = false;
    })
  }
  getStaffs(){
    this.loading = true;
    this.staffs = [];
    this.staffService.getStaffs().pipe(
      map(changes => {
        return changes.map(staffs => {
          const data = staffs.payload.doc.data() as IUser;
          data.id = staffs.payload.doc.id;
          this.staffs.push(data);
        })
      })
    ).subscribe(data => {this.loading = false;this.iconLoaded = true});
  }

  closeModal(){
    this.modalService.dismissAll();
  }
  formatPrice(price, dropDecimals = false) {
    return numeral(price).format(dropDecimals ? '0,0' : '0,0.00');
  }

}
