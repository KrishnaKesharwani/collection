import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoneyReceivedService } from 'src/app/services/moneyReceived/money-received.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-money',
  templateUrl: './update-money.component.html',
  styleUrls: ['./update-money.component.scss']
})
export class UpdateMoneyComponent {
  @Input() title: any;
  loading = false;
  receivedAmountForm!: FormGroup;
  @Output() deleteAction = new EventEmitter();
  amount: string = '';
  getValue: any;
  constructor(public dialogRef: MatDialogRef<UpdateMoneyComponent>, 
    public _service: MoneyReceivedService, 
    public _tostr: ToastrService, 
    public fb: FormBuilder, 
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; data: any },
  ) { }

  ngOnInit() {
    this.receivedAmountForm = this.fb.group({
      amount: [this.dataa.data.amount, Validators.required],
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  updateMoneyStatus() {
    if (this.receivedAmountForm.valid) {
      this.loading = true;
      // debugger;
      let obj = {
        deposit_history_id: this.dataa.data.history_id,
        amount: this.receivedAmountForm.value['amount']
        // ...this.receivedAmountForm.value
      }
      this._service.updateAmount(obj).subscribe((data: any) => {
        this.loading = false;
        this._tostr.success(data.message, 'Success');
        this.dialogRef.close(true);
      }, error => {
        this.loading = false;
        this._tostr.error(error.error.message, 'Error');
      });
    } else {
      this.receivedAmountForm.markAllAsTouched()
    }
  }

}
