import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-provider-loan',
  templateUrl: './provider-loan.component.html',
  styleUrls: ['./provider-loan.component.scss']
})
export class ProviderLoanComponent {
  deleteAction: any;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }
}
