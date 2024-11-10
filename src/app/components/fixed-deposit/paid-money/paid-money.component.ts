import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
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
  constructor(public fb: FormBuilder, public dialogRef: MatDialogRef<PaidMoneyComponent>, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any; },
  ) { }

  ngOnInit() {
    this.dropdownService.setOptions('debitTypeArray', ['monthly', 'money back']);
    // this.debitTypeArray : ['Money Back', 'Monthly'];
    this.fixedDepositId = this.dataa.data.id;

    this.moneyPaidForm = this.fb.group({
      amount: [this.dataa.data.name],
      debitType: ['monthly'],
      details: ['', Validators.required],
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  save() { }

  moneySubmit() {
    this.dialogRef.close();
  }
}
