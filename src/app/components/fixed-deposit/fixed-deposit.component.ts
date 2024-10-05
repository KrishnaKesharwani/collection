import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { AddFixedDepositComponent } from './add-fixed-deposit/add-fixed-deposit.component';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
})
export class FixedDepositComponent {

  deposit_action: any;
  columns = ['Fixed Deposit Name', 'Customer Name', 'Start Date', 'End Date', 'Days / Time Slot', 'Start Amount', 'End Amount', 'Status'];
  depositData = [
    {},
    // Add more customer objects
  ];

  actions = [


    { action: 'edit_deposit', label: 'Change Member', icon: 'mdi mdi-pencil mr-2' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'change_status', label: 'Change Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];
  constructor(private actionService: ActionService) { }

  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {


      case 'edit_deposit':
        this.actionDeposit();
        break;
      case 'view_details':
        this.openDialog2();
        break;
      case 'change_status':
        this.openDialog3();
        break;
    }
  }
  readonly dialog4 = inject(MatDialog);
  actionDeposit() {
    const dialogRef = this.dialog4.open(AddFixedDepositComponent, {
      disableClose: true,
      data: {
        title: 'Update Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // start edit fixed deposit 
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(AddFixedDepositComponent, {
      disableClose: true,

      data: {
        title: 'Update Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  // end edit fixed deposit 

  // start view details
  readonly dialog2 = inject(MatDialog);
  openDialog2() {
    const dialogRef = this.dialog2.open(ViewDetailsComponent, {


      data: {
        title: 'Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  // end view details

  // start change status
  readonly dialog3 = inject(MatDialog);
  openDialog3() {
    const dialogRef = this.dialog3.open(ChangeStatusComponent, {
      disableClose: true,
      data: {
        title: 'Update Status',
        field_value: 'Status'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  // end change status
}
