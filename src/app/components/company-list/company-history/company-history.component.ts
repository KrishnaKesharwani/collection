import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Transaction {
  start_date: string;
  end_date: string;
  plan: number;
  amount: number;
  pending: number;
  status: number;
}

@Component({
  selector: 'app-company-history',
  templateUrl: './company-history.component.html',
  styleUrls: ['./company-history.component.css']
})
export class CompanyHistoryComponent {


  loanDetails: any = [];
  displayedColumns: string[] = ['start_date', 'end_date', 'plan', 'amount', 'pending', 'status'];
  transactions: Transaction[] = [
    { start_date: 'Member No.', end_date: '4', plan: 5, amount: 4, pending: 4, status: 1 }

  ];
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

}
