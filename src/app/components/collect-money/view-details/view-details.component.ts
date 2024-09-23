import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Transaction {
  item: string;
  cost: number;
}
interface Transaction2 {
  item: string;
  cost: number;
  time: number;
  amount: number;
}
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent {
  displayedColumns2: string[] = ['customer_name', 'customer_number', 'time', 'amount'];
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Member Name', cost: 4 },
    { item: 'Collect Date', cost: 5 },
    { item: 'Customer Meet', cost: 2 },
    { item: 'Collect Amount', cost: 4 },
    { item: 'Receive Status', cost: 25 },

  ];
  transactions2: Transaction2[] = [
    { item: 'Member Name', cost: 4, time: 4, amount: 7 },
    { item: 'Collect Date', cost: 5, time: 4, amount: 7 },
    { item: 'Customer Meet', cost: 2, time: 4, amount: 7 },
    { item: 'Collect Amount', cost: 4, time: 4, amount: 7 },
    { item: 'Receive Status', cost: 25, time: 4, amount: 7 },

  ];
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
  getTotalCost2() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}
