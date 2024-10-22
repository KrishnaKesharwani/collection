import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonComponentService } from 'src/app/common/common-component.service';

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
  receivedamount: string = '';
  moneystatus: string = '';
  moneydetails: string = '';
  constructor(public fb: FormBuilder, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {
    this.receivedAmountForm = this.fb.group({
      receivedamount: ['10000'],
      moneystatus: [''],
      moneydetails: ['']
    });
    this.dropdownService.setOptions('moneyStatus', ['Working', 'Received', 'Cancelled']);
  }
}
