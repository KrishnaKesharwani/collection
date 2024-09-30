import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Transaction {
  item: string;
  cost: number;
  item2: string;
  cost2: number;
}
interface Transaction2 {
  item: string;
  cost: number;

}

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {

  companyDetails: any = [];
  displayedColumns: string[] = ['item', 'cost', 'item2', 'cost2'];
  displayedColumns2: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Company Name', cost: 4, item2: 'Owner Name', cost2: 4 },
    { item: 'Mobile', cost: 5, item2: 'Start Date', cost2: 4 },
    { item: 'End Date', cost: 2, item2: 'Adhar No.', cost2: 4 },
    { item: 'Current Plan', cost: 4, item2: 'Total Amount', cost2: 4 },
    { item: 'Pending Amount', cost: 25, item2: 'Status', cost2: 4 },
    { item: 'Login Id', cost: 15, item2: 'Paswword', cost2: 4 },
    { item: 'Address', cost: 15, item2: 'Details', cost2: 4 }

  ];

  transactions2: Transaction2[] = [
    { item: 'Company Logo', cost: 4 },
    { item: 'Company Sidebar Logo', cost: 5 },
    { item: 'Company Fevicon Icon', cost: 2 },
    { item: 'Company Owner Profile', cost: 4 }

  ];
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

}
