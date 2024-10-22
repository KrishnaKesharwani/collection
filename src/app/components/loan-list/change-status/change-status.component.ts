import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CommonComponentService } from 'src/app/common/common-component.service';
interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent {

  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Fixed Deposit Name', cost: 4 },

    { item: 'Start Date', cost: 15 },
    { item: 'End Date', cost: 15 },
    { item: 'Days / Time Slot', cost: 15 },
    { item: 'Start Amount', cost: 15 },
    { item: 'End  Amount', cost: 15 }
  ];
  constructor(public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }



  ngOnInit() {
    this.dropdownService.setOptions('status', ['Pending', 'Running', 'Completed', 'Cancelled', 'Settlement']);

  }

  save() { }
}
