import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { MoneyReceivedService } from 'src/app/services/moneyReceived/money-received.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vpdate-status',
  templateUrl: './vpdate-status.component.html',
  styleUrls: ['./vpdate-status.component.scss']
})
export class VpdateStatusComponent {
  @Input() title: any;
  loading = false;
  receivedAmountForm!: FormGroup;

  @Output() deleteAction = new EventEmitter();
  // constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
  //   , public fb: FormBuilder) { }
  amount: string = '';
  moneystatus: string = '';
  details: string = '';
  constructor(public dialogRef: MatDialogRef<VpdateStatusComponent>, public _service: MoneyReceivedService, public _tostr: ToastrService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any, data: any },
  ) { }

  ngOnInit() {
    this.receivedAmountForm = this.fb.group({
      amount: [this.dataa.data.balance, Validators.required],
      // moneystatus: [''],
      details: ['']
    });
    // this.dropdownService.setOptions('moneyStatus', ['Working', 'Received', 'Cancelled']);
  }

  onClose() {
    this.dialogRef.close();
  }

  submitStatus() {
    if (this.receivedAmountForm.value.amount <= this.dataa.data.balance) {
      if (this.receivedAmountForm.valid) {
        this.loading = true;
        let obj = {
          collection_id: this.dataa.id,
          ...this.receivedAmountForm.value
        }
        this._service.changeStatus(obj).subscribe((data: any) => {
          this.receivedAmountForm.reset();
          this._tostr.success(data.message, 'Success');
          this.dialogRef.close(true);
          this.loading = false;
        }, error => {
          this.loading = false;
          this._tostr.error(error.error.message, 'Error');
        });
      } else {
        this.receivedAmountForm.markAllAsTouched()
      }
    } else {
      this._tostr.error("Amount not exceed", "Error");
    }

  }

}
