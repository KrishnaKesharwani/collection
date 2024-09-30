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
  loanDetails: any = [];
  displayedColumns: string[] = ['date', 'receiver', 'amount'];
  transactions: Transaction[] = [
    { date: 'Member No.', receiver: 4, amount: 4 },
    { date: 'Profile Image', receiver: 5, amount: 4 },

  ];
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }



  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.receiver).reduce((acc, value) => acc + value, 0);
  }
}
