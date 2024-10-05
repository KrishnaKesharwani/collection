import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-advance-money',
  templateUrl: './advance-money.component.html',
  styleUrls: ['./advance-money.component.scss']
})
export class AdvanceMoneyComponent {
  @Input() title: any;
  loading = false;
  advanceAmountForm!: FormGroup;
  advancedetails: string = "";
  advanceamount: string = "";

  constructor(public fb: FormBuilder, private dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  ngOnInit() {

    this.advanceAmountForm = this.fb.group({
      advanceamount: ['10000'],
      advancedetails: [''],
    });
    // this.dropdownService.setOptions('member', ['Allot Members', 'Roshan Kanojiya', 'Bhaijan']);
  }
}
