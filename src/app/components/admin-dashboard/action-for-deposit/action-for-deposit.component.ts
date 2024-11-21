import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { LoanService } from 'src/app/services/loan/loan.service';

@Component({
  selector: 'app-action-for-deposit',
  templateUrl: './action-for-deposit.component.html',
  styleUrls: ['./action-for-deposit.component.scss']
})
export class ActionForDepositComponent {
  data: any;
  changeRequestStatusForm!: FormGroup;
  deposit_request_reason: string = "";
  loading = false;
  gatLoanid: any;

  constructor(public dialogRef: MatDialogRef<ActionForDepositComponent>, public _service: LoanService, public _toaster: ToastrService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string; data: any; },
  ) { }

  ngOnInit() {
    this.data = this.dataa.data;
    this.gatLoanid = this.dataa.data.id;
    this.changeRequestStatusForm = this.fb.group({
      // customerNo: ['', Validators.required],
      loan_status: [this.dataa?.data?.loans?.loan_status, Validators.required],
      deposit_request_reason: ['', Validators.required]
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  updateReponseStatus() {
    if (this.changeRequestStatusForm.valid) {

      let currentloan_status = this.changeRequestStatusForm.get('loan_status')?.value;
      let currentloan_reason = this.changeRequestStatusForm.get('loanreason')?.value;
      if (this.gatLoanid != "") {
        this.loading = true;
        let obj = {
          loan_id: this.gatLoanid,
          loan_status: currentloan_status,
          reason: currentloan_reason,
        }
        this._service.updateLoanStatus(obj).subscribe((data: any) => {
          if (data) {
            this._toaster.success('Loan Status updated!......', 'Success');
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
    } else {
      this.changeRequestStatusForm.markAllAsTouched();
    }

  }
}
