import { Component, inject } from '@angular/core';
import { InstallmentHistoryComponent } from './installment-history/installment-history.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ViewMemberListComponent } from '../member-list/view-member-list/view-member-list.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {

  constructor() { }

  ngOnInit() {

  }

  submitMessage() {

  }

  openDialogAdd() { }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(InstallmentHistoryComponent, {
      disableClose: true,
      data: {
        title: 'Loan Instalment History',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog2 = inject(MatDialog);

  openDialog2() {
    const dialogRef = this.dialog2.open(AssignMemberComponent, {

      disableClose: true,
      data: {
        title: 'Assign Loan Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  readonly dialog3 = inject(MatDialog);

  openDialog3() {
    const dialogRef = this.dialog3.open(ChangeMemberComponent, {
      disableClose: true,

      data: {
        title: 'Update Loan Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  readonly dialog4 = inject(MatDialog);

  openDialog4() {
    const dialogRef = this.dialog4.open(ViewDetailsComponent, {

      data: {
        title: 'Loan Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  readonly dialog5 = inject(MatDialog);

  openDialog5() {
    const dialogRef = this.dialog5.open(ChangeStatusComponent, {
      disableClose: true,

      data: {
        title: 'Change Loan Status',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
