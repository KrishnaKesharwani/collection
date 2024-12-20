import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-view-member-list',
  templateUrl: './view-member-list.component.html',
  styleUrls: ['./view-member-list.component.scss']
})


export class ViewMemberListComponent {
  member_details: any = [];

  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Member No.', cost: 4 },
    { item: 'Profile Image', cost: 5 },
    { item: 'Member Name', cost: 2 },
    { item: 'Mobile', cost: 4 },
    { item: 'Email Id', cost: 25 },
    { item: 'Aadhar No.', cost: 15 },
    { item: 'Join Date', cost: 15 },
    { item: 'Status ', cost: 15 },
    { item: 'Address ', cost: 15 },
  ];
  data: any;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }


  ngOnInit() {
    this.viewMemberDetails();
  }

  viewMemberDetails() {
    this.data = this.dataa.data;
  }
}
