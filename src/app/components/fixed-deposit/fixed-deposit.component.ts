import { Component, inject } from '@angular/core';
import { EditFixedDepositComponent } from './edit-fixed-deposit/edit-fixed-deposit.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
})
export class FixedDepositComponent {

  deposit_action: any;

  actionDeposit(number: any) {
  }

  // start edit fixed deposit 
  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(EditFixedDepositComponent, {
      width: '50%',

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
      width: '450px',
      height: '650px',
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
      width: '450px',
      height: '650px',
      data: {
        title: 'Update Status',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // end change status
}
