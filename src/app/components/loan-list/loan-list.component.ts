import { Component, inject } from '@angular/core';
import { InstallmentHistoryComponent } from './installment-history/installment-history.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ViewMemberListComponent } from '../member-list/view-member-list/view-member-list.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { MatDialog } from '@angular/material/dialog';
import { ActionService } from 'src/app/services/action/action.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';

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
  filteredDataarray: any[] = [];
  loanDataList: any[] = [];
  loader: any;
  constructor(public _customActionService: CustomActionsService, private actionService: ActionService, public _loanService: LoanService) { }


  ngOnInit() {

  }



  readonly dialog = inject(MatDialog);

  openDialogInstallmentHistory() {
    const dialogRef = this.dialog.open(InstallmentHistoryComponent, {
      disableClose: true,
      data: {
        title: 'Loan Instalment History',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogAssignMember() {
    const dialogRef = this.dialog.open(AssignMemberComponent, {

      disableClose: true,
      data: {
        title: 'Assign Loan Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



  openDialogChangeMember() {
    const dialogRef = this.dialog.open(ChangeMemberComponent, {
      disableClose: true,

      data: {
        title: 'Update Loan Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



  openDialogViewDetail() {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {

      data: {
        title: 'Loan Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



  openDialogChangeStatus(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      disableClose: true,
      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Change Loan Status',

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
    this.filteredDataarray = this._customActionService.sortData(column, this.loanDataList);


  }


  searchColumns: any[] = ['company_name', 'owner_name', 'advance_amount', 'status', 'mobile'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;

    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.loanDataList;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }

  }
}
