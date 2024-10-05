import { Component, inject } from '@angular/core';
import { InstallmentHistoryComponent } from './installment-history/installment-history.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ViewMemberListComponent } from '../member-list/view-member-list/view-member-list.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { MatDialog } from '@angular/material/dialog';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {

  columns = ['Loan No.', 'Customer No.', 'Logo', 'Name', 'Mobile', 'Assign', 'Loan Amt', 'Pending Amt', 'Status'];
  loanData = [
    {},
    // Add more customer objects
  ];

  actions = [


    { action: 'installment_history', label: 'Installment History', icon: 'mdi mdi-history mr-2' },
    { action: 'assign_member', label: 'Assign Member', icon: 'mdi mdi-account-check-outline mr-2' },
    { action: 'change_member', label: 'Change Member', icon: 'mdi mdi-account-switch-outline mr-2' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'change_status', label: 'Change Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];
  constructor(private actionService: ActionService) { }


  ngOnInit() {

  }


  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {


      case 'installment_history':
        this.openDialog();
        break;
      case 'assign_member':
        this.openDialog2();
        break;
      case 'change_member':
        this.openDialog3();
        break;
      case 'view_details':
        this.openDialog4();
        break;
      case 'change_status':
        this.openDialog5();
        break;
    }
  }

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
