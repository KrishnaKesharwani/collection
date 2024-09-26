import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
interface Transaction {
  item: string;
  cost: number;
}
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {

  loanDetails: any = [];
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Loan No.', cost: 4 },
    { item: 'Customer No.', cost: 4 },
    { item: 'Profile Image', cost: 5 },
    { item: 'Customer Name', cost: 2 },
    { item: 'Mobile', cost: 4 },

    { item: 'Aadhar No.', cost: 15 },
    { item: 'Assign Member', cost: 15 },
    { item: 'Loan Start Date', cost: 15 },
    { item: 'Loan Amount', cost: 15 },
    { item: 'Pending Amount', cost: 15 },
    { item: 'Status ', cost: 15 },
    { item: 'Address ', cost: 15 },
  ];
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }


}
