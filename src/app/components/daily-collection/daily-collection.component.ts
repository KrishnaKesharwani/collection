import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CollectionHistoryComponent } from './collection-history/collection-history.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';

@Component({
  selector: 'app-daily-collection',
  templateUrl: './daily-collection.component.html',
  styleUrls: ['./daily-collection.component.scss']
})
export class DailyCollectionComponent {
  loanassign_action = 0;
  readonly dialog = inject(MatDialog);
  company_id: any;
  customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;

  actions = [


    { action: 'collection_history', label: 'Collection History', icon: 'mdi mdi-history mr-2' },
    { action: 'assign_member', label: 'Assign Member', icon: 'mdi mdi-account-check-outline mr-2' },
    { action: 'change_member', label: 'Change Member', icon: 'mdi mdi-account-switch-outline mr-2' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'status', label: 'Change Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];


  constructor(public _customActionService: CustomActionsService, private actionService: ActionService, public dropdownService: CommonComponentService) { }

  ngOnInit(): void {

    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {

      case 'collection_history':
        this.openDialogCollectionHistory();
        break;
      case 'assign_member':
        this.openDialogAssignMember();
        break;
      case 'change_member':
        this.openDialogChangeMember();
        break;
      case 'view_details':
        this.openDialogViewDetail(actionData.row);
        break;
      case 'status':
        this.openDialogChangeStatus(actionData.row);
        break;
    }
  }
  loanAssignMember(action: number) {
    this.loanassign_action = action;
  }



  openDialogCollectionHistory() {
    const dialogRef = this.dialog.open(CollectionHistoryComponent, {

      disableClose: true,
      data: {
        title: 'Recent Collection History',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogAssignMember() {
    const dialogRef = this.dialog.open(AssignMemberComponent, {
      disableClose: true,
      data: {
        title: 'Assign Collection Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogChangeMember() {
    const dialogRef = this.dialog.open(ChangeMemberComponent, {
      disableClose: true,
      data: {
        title: 'Update Collection Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogViewDetail(data: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {

      data: {
        title: 'Member Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogChangeStatus(data: any) {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      disableClose: true,
      panelClass: 'delete_popup',
      data: {
        title: 'Change Deposit Status',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.customerData);
  }

  searchColumns: any[] = ['name', 'status', 'mobile'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.customerData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }
}
