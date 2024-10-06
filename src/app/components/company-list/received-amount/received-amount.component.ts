import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-received-amount',
  templateUrl: './received-amount.component.html',
  styleUrls: ['./received-amount.component.scss']
})
export class ReceivedAmountComponent {

  receivedAmountForm!: FormGroup;
  amountDetails: string = '';
  receivedDate: string = '';
  companyName: string = '';
  receivedAmount: string = '';
  loading = false;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }
    , public fb: FormBuilder) { }

  ngOnInit() {
    this.receivedAmountForm = this.fb.group({
      companyName: ['RK Group'],
      receivedAmount: [''],
      receivedDate: [''],
      amountDetails: ['']
    });
  }


  submit() {
    // Add New Company
    this.receivedAmountForm.markAllAsTouched()
    if (this.receivedAmountForm.valid) {
      // this.dialog.closeAll();
    }
  }
}
