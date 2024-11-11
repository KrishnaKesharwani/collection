import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FixedDepositService } from 'src/app/services/fixedDeposit/fixed-deposit.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-paid-money',
  templateUrl: './paid-money.component.html',
  styleUrls: ['./paid-money.component.scss']
})
export class PaidMoneyComponent {

  @Output() deleteAction = new EventEmitter();
  moneyPaidForm!: FormGroup;
  fixedDepositId!: 1;
  selectControl = new FormControl('');
  debitTypeArray: [] = [];
  amount: string = '';
  details: string = '';
  data: any;
  loading: any;
  constructor(public _router: Router, public _service: FixedDepositService, public _tostr: ToastrService, public fb: FormBuilder, public dialogRef: MatDialogRef<PaidMoneyComponent>, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any; },
  ) { }

  ngOnInit() {

    this.fixedDepositId = this.dataa.data.id;

    this.moneyPaidForm = this.fb.group({
      amount: ['', Validators.required],
      debit_type: ['', Validators.required],
      details: [''],
    });
    this.getViewDeposit();
  }


  getViewDeposit() {
    console.log(this.dataa.data)
    this.data = this.dataa.data;

  }
  onClose() {
    this.dialogRef.close();
  }

  save() {
    if (this.moneyPaidForm.valid) {
      this.loading = true;
      let obj = {
        fixed_deposit_id: this.dataa.data.id,
        ...this.moneyPaidForm.value
      }
      this._service.payFixedDeposit(obj).subscribe((data: any) => {
        this.loading = false;
        this.dialogRef.close(true);
        this._tostr.success(data.message, "Success");
        this._router.navigate(['/fixed_deposit']);
      })
    } else {
      this.moneyPaidForm.markAllAsTouched()
    }

  }

  moneySubmit() {
    this.dialogRef.close();
  }
}
