import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceMoneyComponent } from './advance-money/advance-money.component';
import { VpdateStatusComponent } from './vpdate-status/vpdate-status.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

@Component({
  selector: 'app-money-received',
  templateUrl: './money-received.component.html',
  styleUrls: ['./money-received.component.scss']
})
export class MoneyReceivedComponent {
  readonly dialog = inject(MatDialog);

  openDialogReceiverDetails() {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      disableClose: false,
      data: {
        title: 'Money Collection Details',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
  openDialogChangeStatus() {
    const dialogRef = this.dialog.open(VpdateStatusComponent, {
      disableClose: true,
      data: {
        title: 'Received Money Status',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogAdvanceMoney() {
    const dialogRef = this.dialog.open(AdvanceMoneyComponent, {
      disableClose: true,
      data: {
        title: 'Add Advance Money',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  
}
