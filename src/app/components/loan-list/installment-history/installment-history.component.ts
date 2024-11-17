import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Transaction {
  date: string;
  receiver: number;
  amount: number;
}

@Component({
  selector: 'app-installment-history',
  templateUrl: './installment-history.component.html',
  styleUrls: ['./installment-history.component.scss']
})
export class InstallmentHistoryComponent {
  historyData: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any; },
  ) { }

  ngOnInit() {
    this.historyData = this.dataa.data.loan_history;
  }
}
