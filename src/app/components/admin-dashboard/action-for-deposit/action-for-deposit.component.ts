import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { DepositRequestService } from 'src/app/services/depositRequest/deposit-request.service';
import { LoanService } from 'src/app/services/loan/loan.service';

@Component({
  selector: 'app-action-for-deposit',
  templateUrl: './action-for-deposit.component.html',
  styleUrls: ['./action-for-deposit.component.scss']
})
export class ActionForDepositComponent {
  data: any;
  changeRequestStatusForm!: FormGroup;
  replied_message: string = "";
  loading = false;
  gatLoanid: any;

  constructor(public dialogRef: MatDialogRef<ActionForDepositComponent>, public _service: LoanService, public _requestService: DepositRequestService, public _toaster: ToastrService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string; data: any; },
  ) { }

  ngOnInit() {
    this.changeRequestStatusForm = this.fb.group({
      status: [this.dataa.data.status, Validators.required],
      replied_message: ['', Validators.required]
    });

    this.getRequestMoneyDetails();
  }

  getRequestMoneyDetails() {
    this.data = this.dataa.data;
  }

  onClose() {
    this.dialogRef.close();
  }

  updateReponseStatus(data: any) {
    if (this.changeRequestStatusForm.valid) {
      this.loading = true;
      let obj = {
        request_id: data.id,
        status: this.changeRequestStatusForm.value.status,
        replied_message: this.changeRequestStatusForm.value.replied_message,
      }
      this._requestService.updateDepositRequest(obj).subscribe((data: any) => {
        if (data) {
          this._toaster.success(data.message, 'Success');
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
    else {
      this.changeRequestStatusForm.markAllAsTouched();
    }

  }
}
