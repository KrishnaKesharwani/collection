import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CollectionHistoryComponent } from './collection-history/collection-history.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-daily-collection',
  templateUrl: './daily-collection.component.html',
  styleUrls: ['./daily-collection.component.scss']
})
export class DailyCollectionComponent {
  loanassign_action = 0;
  columns = ['Customer No.', 'Image', 'Name', 'Mobile', 'Assign', 'Available Amt', 'Status'];
  collectionData = [
    {},
    // Add more customer objects
  ];

  actions = [


    { action: 'collection_history', label: 'Collection History', icon: 'mdi mdi-history mr-2' },
    { action: 'assign_member', label: 'Assign Member', icon: 'mdi mdi-account-check-outline mr-2' },
    { action: 'change_member', label: 'Change Member', icon: 'mdi mdi-account-switch-outline mr-2' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'status', label: 'Change Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];

  constructor(private actionService: ActionService, public dropdownService: CommonComponentService) { }

  ngOnInit(): void {
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {

      case 'collection_history':
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
      case 'status':
        this.openDialog5();
        break;
    }
  }
  loanAssignMember(action: number) {
    this.loanassign_action = action;
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CollectionHistoryComponent, {

      disableClose: true,
      data: {
        title: 'Recent Collection History',

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
        title: 'Assign Collection Member',

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
        title: 'Update Collection Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog4 = inject(MatDialog);

  openDialog4() {
    const dialogRef = this.dialog4.open(ViewDetailsComponent, {

      data: {
        title: 'Member Details',

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
        title: 'Change Member Status',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
