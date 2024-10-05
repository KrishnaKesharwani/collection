import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceMoneyComponent } from './advance-money/advance-money.component';
import { VpdateStatusComponent } from './vpdate-status/vpdate-status.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-money-received',
  templateUrl: './money-received.component.html',
  styleUrls: ['./money-received.component.scss']
})
export class MoneyReceivedComponent {
  columns = ['Member Name', 'Collect Date', 'Customer Meet', 'Collect Amount', 'Receive Status'];
  moneyReceivedData = [
    { MemberNo: 1, image: `<img src="assets/imgs/default-pic.png" />`, Name: 'John Doe', Mobile: '1234567890', Email: 'rk@gmail.com', AadharNo: '1111-2222-3333', JoinDate: '12-12-2000', status: 'Active' },
    // Add more customer objects
  ];

  actions = [

    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'change_status', label: 'Change Status', icon: 'mdi mdi-plus-circle-outline mr-2' },


    { action: 'advance_money', label: 'Advance Money', icon: 'mdi mdi-plus-circle-outline mr-2' },


  ];

  constructor(private actionService: ActionService) { }

  ngOnInit() {

  }


  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {
      case 'change_status':
        this.openDialogChangeStatus();
        break;
      case 'view_details':
        this.openDialogReceiverDetails();
        break;

      case 'advance_money':
        this.openDialogAdvanceMoney();
        break;

    }

  }


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
