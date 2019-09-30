import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../../services/staff.service';
import { IUser } from '../../models/user';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss', '../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss','../../../vendor/libs/ng-select/ng-select.scss','../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss']
})
export class StaffComponent implements OnInit {

  selectedDepartment = "bar";
   departments = ["admin", "reception", "restaurant", "bar"
  ];
  loaded: boolean = false;


  staffs: IUser[] = [];
  selectedStaff;

  staffForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]]
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
    this.selectedStaff = data;
    this.modalService.open(content, {size: 'lg', backdrop: true, centered: true})
  }

  addStaff(){
    this.staffForm.addControl('department', this.fb.control(this.selectedDepartment))
    this.staffService.saveStaff(this.staffForm.value)
    .then(suc => {
      this.modalService.dismissAll();
      this.staffForm.removeControl('department');
      this.staffForm.reset();
      this.getStaffs();
    })
  }
  getStaffs(){
    this.staffs = [];
    this.staffService.getStaffs().pipe(
      map(changes => {
        return changes.map(staffs => {
          const data = staffs.payload.doc.data() as IUser;
          data.id = staffs.payload.doc.id;
          this.staffs.push(data);
        })
      })
    ).subscribe(data => this.loaded = true);
  }


  deleteStaff(){
    this.authService.deleteUser(this.selectedStaff.email, this.selectedStaff.password).then(
      staff => {
        staff.user.delete().then(res => {
          this.staffService.deleteStaff(this.selectedStaff.id).then(res => {
            this.getStaffs();
            this.closeModal();
          })
        })
      }
    )
  }
  closeModal(){
    this.modalService.dismissAll();
  }

}
