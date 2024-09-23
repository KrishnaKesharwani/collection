import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-view-customer-list',
  templateUrl: './view-customer-list.component.html',
  styleUrls: ['./view-customer-list.component.css']
})




export class ViewCustomerListComponent {
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Customer No.', cost: 4 },
    { item: 'Profile Image', cost: 5 },
    { item: 'Customer Name', cost: 2 },
    { item: 'Mobile', cost: 4 },
    { item: 'Email Id', cost: 25 },
    { item: 'Aadhar No.', cost: 15 },
    { item: 'Join Date', cost: 15 },
    { item: 'Loan Amount', cost: 15 },
    { item: 'Pending Amount', cost: 15 },
    { item: 'Status ', cost: 15 },
    { item: 'Address ', cost: 15 },
  ];
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
}
