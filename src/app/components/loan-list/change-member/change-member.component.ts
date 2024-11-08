import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';
import Swal from 'sweetalert2';
import { LoanService } from 'src/app/services/loan/loan.service';
import { MemberService } from 'src/app/services/member/member.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-member',
  templateUrl: './change-member.component.html',
  styleUrls: ['./change-member.component.scss']
})
export class ChangeMemberComponent {

  @Input() title: any;

  @Output() deleteAction = new EventEmitter();
  current_member_name = "";
  loading: boolean = false;
  gatLoanid: any;
  company_id: any;
  changeMemberForm!: FormGroup;  
  selectControl = new FormControl('');

  constructor( public fb: FormBuilder, public dialogRef: MatDialogRef<ChangeMemberComponent>, public _toaster: ToastrService, public _service: MemberService, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string, subTitle: string, data: any; },
  ) { }

  ngOnInit() {
    // this.dropdownService.setOptions('member', ['Allot Members', 'Roshan Kanojiya', 'Bhaijan']);
    // this.current_member_name= this.dataa.data.member.name;
    this.gatLoanid = this.dataa.data.id;
    this.changeMemberForm = this.fb.group({
      assigned_member_id: [this.dataa?.data?.assigned_member_id || null],
    });
  }

  onClose() {
    this.dialogRef.close();
  }
  assignLoan() {
    let member_id = this.changeMemberForm.get('assigned_member_id')?.value;
    if (this.gatLoanid != "") {
      this.loading = true;
      let obj = {
        member_id: member_id,
        loan_id: this.gatLoanid,
        reason: 'Assign Loan for member'
      }
      this._service.assignLoanMember(obj).subscribe((data: any) => {
        if (data) {
          this._toaster.success('Loan Assign Successfully!......', 'Success');
          // Swal.fire({
          //   position: "center",
          //   icon: "success",
          //   title: 'Assign Loan',
          //   text: 'Loan Assign Successfully!......',
          //   showConfirmButton: false,
          //   timer: 1000
          // });
          this.dialogRef.close(true);
        } else {
          this._toaster.error(data.message, 'Error');
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        this._toaster.error(error.error.message, 'Error');
      });
    }
  }
}
