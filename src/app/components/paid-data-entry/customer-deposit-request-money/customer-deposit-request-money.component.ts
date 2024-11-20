import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-deposit-request-money',
  templateUrl: './customer-deposit-request-money.component.html',
  styleUrls: ['./customer-deposit-request-money.component.css']
})
export class CustomerDepositRequestMoneyComponent {
  deleteAction: any;
  amount: string = '';
  loading: any;
  collection_type: any;
  requestMoneyForm!: FormGroup;
  customer_id: any;

  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }) { }

  ngOnInit() {

    this.requestMoneyForm = this.fb.group({
      amount: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }


  customerDepositApply() {

  }
}
