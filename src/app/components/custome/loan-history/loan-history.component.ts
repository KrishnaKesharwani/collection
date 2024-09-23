import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.component.html',
  styleUrls: ['./loan-history.component.scss']
})
export class LoanHistoryComponent {
  displayedColumns: string[] = ['state_date', 'end_date', 'days', 'amount', 'pending', 'status', 'download'];
  data: string[] = ['one', 'two', 'three', 'four', 'five'];
  @Input() title: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }
  ngOnInit() {

  }


}


