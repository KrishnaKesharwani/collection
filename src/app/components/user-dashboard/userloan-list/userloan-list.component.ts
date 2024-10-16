import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApplyLoanComponent } from '../../custome/apply-loan/apply-loan.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';

@Component({
  selector: 'app-userloan-list',
  templateUrl: './userloan-list.component.html',
  styleUrls: ['./userloan-list.component.scss']
})

export class UserloanListComponent {
  private isDialogOpen = false;
  filteredDataarray: any;
  loader: any;
  
  constructor(public dialog: MatDialog) { }
  
  data: any[] = [];
  openDialogViewDetail(): void {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        title: 'Loan Details',
        data: this.data
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.isDialogOpen = false;
    });
  }
  
  openDialogApplyLoan() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ApplyLoanComponent, {
      disableClose: true,
      data: {
        title: 'Apply New Loan',
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      // this.delete();
      this.isDialogOpen = false;
    });
  }
}
