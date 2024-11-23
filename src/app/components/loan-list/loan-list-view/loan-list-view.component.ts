import { Component, inject, Input } from '@angular/core';
import { InstallmentHistoryComponent } from '../installment-history/installment-history.component';
import { AssignMemberComponent } from '../assign-member/assign-member.component';
import { ChangeMemberComponent } from '../change-member/change-member.component';
import { ViewDetailsComponent } from '../view-details/view-details.component';
import { ChangeStatusComponent } from '../change-status/change-status.component';
import { MatDialog } from '@angular/material/dialog';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { LoanService } from 'src/app/services/loan/loan.service';

@Component({
  selector: 'app-loan-list-view',
  templateUrl: './loan-list-view.component.html',
  styleUrls: ['./loan-list-view.component.scss']
})

export class LoanListViewComponent {
  @Input() listLoadType: any;
  filteredDataarray: any[] = [];
  loanDataList: any[] = [];
  company_id: any;
  loader = false;
  user_type: any;
  // @Input() listLoadType: string;
  constructor(public _customActionService: CustomActionsService, private actionService: ActionService, public _loanService: LoanService) { }

  ngOnChanges() {
  }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.user_type = userData.user_type;
    }
    this.getLoanList();
  }

  getLoanList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      loan_status: this.listLoadType,
      status: 'active'
    }
    this._loanService.getLoanList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.loanDataList = response.data;
        this.filteredDataarray = this.loanDataList;
        this.loader = false;
      }
    })
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

  searchColumns: any[] = ['company_name', 'owner_name', 'advance_amount', 'mobile'];
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
