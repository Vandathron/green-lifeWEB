import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss', '../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss','../../../vendor/libs/ng-select/ng-select.scss','../../../vendor/libs/angular-2-dropdown-multiselect/angular-2-dropdown-multiselect.scss']
})
export class StaffComponent implements OnInit {

  selectedDepartment;
   departments = ["admin", "reception", "restaurant", "bar"
  ];

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
    private staffService: StaffService
  ) { }

  ngOnInit() {
  }


  openNewStaff(content, options){
    this.modalService.open(content, options)
  }

  addStaff(){
    this.staffForm.addControl('department', this.fb.control(this.selectedDepartment))
    this.staffService.saveStaff(this.staffForm.value)
    .then(suc => console.log("Saved successfully", suc))
  }

}
