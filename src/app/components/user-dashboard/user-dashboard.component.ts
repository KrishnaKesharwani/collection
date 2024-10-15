import { Component } from '@angular/core';
import { ApplyLoanComponent } from '../custome/apply-loan/apply-loan.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  private isDialogOpen = false;

  constructor(public dialog: MatDialog) { }
  // submitMessage() {

  // }
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
