import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-amount-paid-history',
  templateUrl: './amount-paid-history.component.html',
  styleUrls: ['./amount-paid-history.component.scss']
})
export class AmountPaidHistoryComponent {
  data: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any; },
  ) { }

  ngOnInit() {
    this.data = this.dataa.data.fixed_deposit_history;
  }
}

