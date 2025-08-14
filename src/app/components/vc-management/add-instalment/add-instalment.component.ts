import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { MoneyReceivedService } from 'src/app/services/moneyReceived/money-received.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-instalment',
  templateUrl: './add-instalment.component.html',
  styleUrls: ['./add-instalment.component.scss']
})
export class AddInstalmentComponent {
  @Input() title: any;
  loading = false;
  InstalmentForm!: FormGroup;

  @Output() deleteAction = new EventEmitter();
  amount: string = '';
  constructor(public dialogRef: MatDialogRef<AddInstalmentComponent>, public _service: MoneyReceivedService, public _tostr: ToastrService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any, data: any },
  ) { }

  ngOnInit() {
    this.InstalmentForm = this.fb.group({
      amount: [this.dataa.data.balance, Validators.required],
    });
    // this.dropdownService.setOptions('moneyStatus', ['Working', 'Received', 'Cancelled']);
  }

  onClose() {
    this.dialogRef.close();
  }

  submitInstalment() {
    // if (this.InstalmentForm.value.amount <= this.dataa.data.balance) {
    //   if (this.InstalmentForm.valid) {
    //     this.loading = true;
    //     let obj = {
    //       collection_id: this.dataa.id,
    //       ...this.InstalmentForm.value
    //     }
    //     this._service.changeStatus(obj).subscribe((data: any) => {
    //       this.InstalmentForm.reset();
    //       this._tostr.success(data.message, 'Success');
    //       this.dialogRef.close(true);
    //       this.loading = false;
    //     }, error => {
    //       this.loading = false;
    //       this._tostr.error(error.error.message, 'Error');
    //     });
    //   } else {
    //     this.InstalmentForm.markAllAsTouched()
    //   }
    // } else {
    //   this._tostr.error("Amount not exceed", "Error");
    // }
  }
}
