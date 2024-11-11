import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';


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


  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Fixed Deposit Name', cost: 4 },
    { item: 'Customer Name', cost: 5 },
    { item: 'Customer Mobile', cost: 2 },
    { item: 'Customer Email', cost: 4 },
    { item: 'Customer Mobile', cost: 25 },
    { item: 'Start Date', cost: 15 },
    { item: 'End Date', cost: 15 },
    { item: 'Days / Time Slot', cost: 15 },
    { item: 'Start Amount', cost: 15 },
    { item: 'End  Amount', cost: 15 },
    { item: 'Status', cost: 15 },
    { item: 'Details', cost: 15 },
  ];
  data: any;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    this.getViewDeposit();
  }
  getViewDeposit() {
    console.log(this.dataa.data)
    this.data = this.dataa.data;

  }


}
