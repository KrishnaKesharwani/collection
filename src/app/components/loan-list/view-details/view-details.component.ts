import { Component, Inject, Input } from '@angular/core';
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
  data: any;
  loanApply = false;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any; loantype: boolean; },
  ) { }

  ngOnInit() {
    this.viewMoreDetail();
  }

  viewMoreDetail() {
    this.loanApply = this.dataa.loantype;
    this.data = this.dataa.data;
    console.log(this.data)

  }
}
