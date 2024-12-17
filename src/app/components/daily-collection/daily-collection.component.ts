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
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-daily-collection',
  templateUrl: './daily-collection.component.html',
  styleUrls: ['./daily-collection.component.scss']
})
export class DailyCollectionComponent {
  loanassign_action = 0;
  readonly dialog = inject(MatDialog);
  company_id: any;
  depositData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;

  // actions = [
  //   { action: 'collection_history', label: 'Collection History', icon: 'mdi mdi-history mr-2' },
  //   { action: 'assign_member', label: 'Assign Member', icon: 'mdi mdi-account-check-outline mr-2' },
  //   { action: 'change_member', label: 'Change Member', icon: 'mdi mdi-account-switch-outline mr-2' },
  //   { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
  //   { action: 'status', label: 'Change Status', icon: 'mdi mdi-account-off-outline mr-2' },
  // ];
  depositDetail: any;

  constructor(public _serivce: DailyCollectionService, public _customActionService: CustomActionsService, private actionService: ActionService, public dropdownService: CommonComponentService) { }

  ngOnInit(): void {

    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    // this.dropdownService.setOptions('status', ['Active', 'Inactive']);

    this.getDepositList('active');
  }

  selectedStatus = new FormControl('active');
  getDepositList(statuscall: any) {
    this.depositData = [];
    this.filteredDataarray = [];
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      status: statuscall
    }
    this._serivce.getDepositListForCustomer(obj).subscribe((data: any) => {
      this.depositData = data.data.deposits;
      this.filteredDataarray = this.depositData;
      this.depositDetail = data.data;
      this.loader = false;
    }, error => {
      this.loader = false;
    });
  }

  onStatusChange(event: any): void {
    const selectedValue = event.value;
    this.getDepositList(selectedValue);
  }

  loanAssignMember(action: number) {
    this.loanassign_action = action;
  }

  openDialogCollectionHistory(data?: any) {
    const dialogRef = this.dialog.open(CollectionHistoryComponent, {
      disableClose: false,
      data: {
        title: 'Recent Collection History',
        data: data
      },
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
      if(result){
        this.selectedStatus.setValue('active');
        this.getDepositList('active');
      }
    });
  }
  openDialogChangeMember(data?: any) {
    const dialogRef = this.dialog.open(ChangeMemberComponent, {
      disableClose: true,
      data: {
        title: 'Update Collection Member',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.selectedStatus.setValue('active');
        this.getDepositList('active');
      }
    });
  }
  openDialogViewDetail(data: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      disableClose: false,
      panelClass: 'medium_popup',
      data: {
        title: 'Deposit Details',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openDialogChangeStatus(data: any) {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      disableClose: true,
      // panelClass: 'delete_popup',
      data: {
        title: 'Change Deposit Status',
        id: data.id,
        data: data
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.selectedStatus.setValue('active');
        this.getDepositList('active');
      }
    });
  }
  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.depositData);
  }
  searchColumns: any[] = ['deposit_no', 'name', 'status', 'remaining_amount'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.depositData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }
}
