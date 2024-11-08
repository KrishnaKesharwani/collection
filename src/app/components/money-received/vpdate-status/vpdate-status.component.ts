import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  constructor(public _service: MoneyReceivedService, public _tostr: ToastrService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any },
  ) { }

  ngOnInit() {
    this.receivedAmountForm = this.fb.group({
      amount: [''],
      // moneystatus: [''],
      details: ['']
    });
    // this.dropdownService.setOptions('moneyStatus', ['Working', 'Received', 'Cancelled']);
  }

  submit() {
    let obj = {
      collection_id: this.dataa.id,
      ...this.receivedAmountForm.value
    }
    if (this.receivedAmountForm.valid) {
      this._service.changeStatus(obj).subscribe((data: any) => {
        console.log(data.data);
        this.receivedAmountForm.reset();
        this._tostr.success(data.message, 'Success');
        this.dialog.closeAll();
      })
    } else {
      this.receivedAmountForm.markAllAsTouched()
    }



  }
}
