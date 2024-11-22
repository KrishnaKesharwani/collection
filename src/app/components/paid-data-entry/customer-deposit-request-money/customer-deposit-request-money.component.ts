import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DepositRequestService } from 'src/app/services/depositRequest/deposit-request.service';

@Component({
  selector: 'app-customer-deposit-request-money',
  templateUrl: './customer-deposit-request-money.component.html',
  styleUrls: ['./customer-deposit-request-money.component.scss']
})
export class CustomerDepositRequestMoneyComponent {
  deleteAction: any;
  request_amount: string = '';
  loading: any;
  collection_type: any;
  requestMoneyForm!: FormGroup;
  customer_id: any;

  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public dialog: MatDialog, public _service: DepositRequestService, public _toastr: ToastrService) { }

  ngOnInit() {

    this.requestMoneyForm = this.fb.group({
      request_amount: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }


  customerDepositApply() {
    if (this.requestMoneyForm.valid) {
      this.loading = true;
      let obj = {
        deposit_id: this.dataa.data.id,
        request_amount: this.requestMoneyForm.value.request_amount,
        reason: this.requestMoneyForm.value.reason
      }
      this._service.depositRequest(obj).subscribe((data: any) => {
        this._toastr.success(data.message, "Success");

        this.requestMoneyForm.reset();
        this.dialog.closeAll();
        this.loading = false;
      });
    } else {
      this.requestMoneyForm.markAllAsTouched();
    }
  }
}
