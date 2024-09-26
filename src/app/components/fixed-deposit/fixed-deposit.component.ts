import { Component, inject } from '@angular/core';
import { EditFixedDepositComponent } from './edit-fixed-deposit/edit-fixed-deposit.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { AddFixedDepositComponent } from './add-fixed-deposit/add-fixed-deposit.component';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
})
export class FixedDepositComponent {

  deposit_action: any;

  readonly dialog4 = inject(MatDialog);
  actionDeposit() {
    const dialogRef = this.dialog4.open(AddFixedDepositComponent, {

      data: {
        title: 'Update Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // start edit fixed deposit 
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(EditFixedDepositComponent, {


      data: {
        title: 'Update Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // end edit fixed deposit 

  // start view details
  readonly dialog2 = inject(MatDialog);
  openDialog2() {
    const dialogRef = this.dialog2.open(ViewDetailsComponent, {


      data: {
        title: 'Update Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // end view details

  // start change status
  readonly dialog3 = inject(MatDialog);
  openDialog3() {
    const dialogRef = this.dialog3.open(ChangeStatusComponent, {

      data: {
        title: 'Update Status',
        field_value: 'Status'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // end change status
}
