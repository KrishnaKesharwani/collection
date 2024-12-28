import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { CompleteLoanHistoryComponent } from './complete-loan-history/complete-loan-history.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { InstallmentHistoryComponent } from './installment-history/installment-history.component';
import { ActionForLoanComponent } from '../admin-dashboard/action-for-loan/action-for-loan.component';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {
  loanListData: any = '';
  filteredDataarray: any;
  company_id: any;
  loader: boolean = false;
  runningLoanListData: any[] = [];
  approvedLoanListData: any[] = [];
  pendingLoanListData: any[] = [];
  cancelledLoanListData: any[] = [];
  completedLoanListData: any[] = [];
  total_remaining_amount: any;
  loantype_count: any;
  total_paid_amount: any;
  total_cusotomer: any;
  searchColumnsLoan: any[] = ['loan_no', 'customer_no', 'customer?.name', 'member?.name', 'loan_amount', 'remaining_amount'];
  searchColumnsApply: any[] = ['customer_no', 'name', 'customer?.name', 'applied_user_name', 'apply_date', 'remaining_amount'];
  searchTerm: string = '';
  currentlistFilterArray: any[] = [];
  currentListFilterColoum: any[] = [];
  readonly dialog = inject(MatDialog);
  runningLoanCount: any = 0;
  pendingLoanCount: any = 0;
  approvedLoanCount: any = 0;
  canceledLoanCount: any = 0;
  completedLoanCount: any = 0;
  sum: number = 0;
  totalRunningLoanAmount: any = 0;
  totalAppprovedLoanAmount: any = 0;
  totalPendingLoanAmount: any = 0;
  totalCancelledLoanAmount: any = 0;
  totalCompletedLoanAmount: any = 0;
  totalRunningPendingAmount: any = 0;
  totalApprovedPendingAmount: any = 0;
  totalPendingPendingAmount: any = 0;
  totalCancelledPendingAmount: any = 0;
  totalCompletedPendingAmount: any = 0;

  constructor(public _customActionService: CustomActionsService, public _service: LoanService, public _tostr: ToastrService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      // this.user_type = userData.user_type;
    }
    this.onTabChange(this.selectedTabIndex);
  }

  selectedTabIndex: number = 0;  // Default to 'Approved' tab
  listLoadType: any = 'paid';  // Default to 'approved'
  tabLabels: string[] = ['paid', 'approved', 'pending', 'cancelled', 'completed'];
  listType: any;
  initializeCounter() {
    this.total_remaining_amount = this.loantype_count = this.total_paid_amount = this.total_cusotomer = this.approvedLoanCount = 0;
    this.totalRunningPendingAmount = this.totalApprovedPendingAmount = this.totalCompletedPendingAmount = this.total_cusotomer = 0;
    this.totalRunningLoanAmount = this.totalAppprovedLoanAmount = this.totalPendingLoanAmount = this.totalCancelledLoanAmount = this.totalCompletedLoanAmount = 0;
  }
  onTabChange(index: any) {
    this.filteredDataarray = [];
    this.loader = true;
    if (this.tabLabels[index] != undefined) {
      this.listType = this.tabLabels[index];
    }
    this.listLoadType = this.listType;
    this.initializeCounter();
    let obj = {
      company_id: this.company_id,
      loan_status: this.listLoadType,
      status: 'active'
    };
    if (obj.loan_status == 'paid') {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.runningLoanCount = data.data.loans.length;
          this.total_cusotomer = data.data.total_cusotomer;
          // this.updateLoanValues('paid', data.data);
          // this.runningLoanCount = 0;
          this.pendingLoanCount = 0;
          this.canceledLoanCount = 0;
          this.completedLoanCount = 0;
          this.approvedLoanCount = 0;
          this.runningLoanListData = data.data.loans;

          this.totalRunningLoanAmount = this.runningLoanListData.reduce((sum, loan) => sum + parseFloat(loan.loan_amount), 0);
          this.totalRunningPendingAmount = this.runningLoanListData.reduce((sum, loan) => sum + parseFloat(loan.remaining_amount), 0);
          // this.totalRunningLoanAmount = 0;
          this.totalAppprovedLoanAmount = 0;
          this.totalPendingLoanAmount = 0;
          this.totalCancelledLoanAmount = 0;
          this.totalCompletedLoanAmount = 0;
          // this.totalRunningPendingAmount = 0;
          this.totalApprovedPendingAmount = 0;
          this.totalPendingPendingAmount = 0;
          this.totalCancelledPendingAmount = 0;
          this.totalCompletedPendingAmount = 0;

          this.filteredDataarray = this.runningLoanListData;
          this.currentListFilterColoum = this.searchColumnsLoan;
          this.currentlistFilterArray = this.runningLoanListData;
          this.loader = false;
        } else {
          this.loader = false;
        }
      }, error => {
        this.filteredDataarray = [];
        this.total_remaining_amount = 0.00;
        // this.total_cusotomer = 0;
        this.loader = false;
      });
    } else if (obj.loan_status == 'approved') {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.approvedLoanCount = data.data.loans.length;
          // this.updateLoanValues('approved', data.data);

          this.runningLoanCount = 0;
          this.pendingLoanCount = 0;
          this.canceledLoanCount = 0;
          this.completedLoanCount = 0;
          // this.approvedLoanCount = 0;

          this.total_cusotomer = data.data.total_cusotomer;
          this.approvedLoanListData = data.data.loans;
          this.totalAppprovedLoanAmount = this.approvedLoanListData.reduce((sum, loan) => sum + parseFloat(loan.loan_amount), 0);
          this.totalApprovedPendingAmount = this.approvedLoanListData.reduce((sum, loan) => sum + parseFloat(loan.remaining_amount), 0);
          this.totalRunningLoanAmount = 0;
          // this.totalAppprovedLoanAmount = 0;
          this.totalPendingLoanAmount = 0;
          this.totalCancelledLoanAmount = 0;
          this.totalCompletedLoanAmount = 0;

          this.totalRunningPendingAmount = 0;
          // this.totalApprovedPendingAmount = 0;
          this.totalPendingPendingAmount = 0;
          this.totalCancelledPendingAmount = 0;
          this.totalCompletedPendingAmount = 0;

          this.filteredDataarray = this.approvedLoanListData;
          this.currentListFilterColoum = this.searchColumnsLoan;
          this.currentlistFilterArray = this.approvedLoanListData;
          this.loader = false;
        } else {
          this.loader = false;
        }
      }, error => {
        this.filteredDataarray = [];
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    } else if (obj.loan_status == 'pending') {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.total_cusotomer = data.data.total_cusotomer;
          this.pendingLoanCount = data.data.loans.length;
          // this.updateLoanValues('pending', data.data);

          this.runningLoanCount = 0;
          // this.pendingLoanCount = 0;
          this.canceledLoanCount = 0;
          this.completedLoanCount = 0;
          this.approvedLoanCount = 0;
          this.pendingLoanListData = data.data.loans;
          this.totalPendingLoanAmount = this.pendingLoanListData.reduce((sum, loan) => sum + parseFloat(loan.loan_amount), 0);
          this.totalPendingPendingAmount = this.runningLoanListData.reduce((sum, loan) => sum + parseFloat(loan.remaining_amount), 0);
          this.totalRunningLoanAmount = 0;
          this.totalAppprovedLoanAmount = 0;
          // this.totalPendingLoanAmount = 0;
          this.totalCancelledLoanAmount = 0;
          this.totalCompletedLoanAmount = 0;

          this.totalRunningPendingAmount = 0;
          this.totalApprovedPendingAmount = 0;
          // this.totalPendingPendingAmount = 0;
          this.totalCancelledPendingAmount = 0;
          this.totalCompletedPendingAmount = 0;

          this.filteredDataarray = this.pendingLoanListData;
          this.currentListFilterColoum = this.searchColumnsApply;
          this.currentlistFilterArray = this.pendingLoanListData;
          this.loader = false;
        } else {
          this.loader = false;
        }
      }, error => {
        this.filteredDataarray = [];
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    } else if (obj.loan_status == 'cancelled') {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.total_cusotomer = data.data.total_cusotomer;
          this.canceledLoanCount = data.data.loans.length;
          // this.updateLoanValues('cancelled',data.data);

          this.runningLoanCount = 0;
          this.pendingLoanCount = 0;
          // this.canceledLoanCount = 0;
          this.completedLoanCount = 0;
          this.approvedLoanCount = 0;
          this.cancelledLoanListData = data.data.loans;
          this.totalCancelledLoanAmount = this.cancelledLoanListData.reduce((sum, loan) => sum + parseFloat(loan.loan_amount), 0);
          this.totalCancelledPendingAmount = this.runningLoanListData.reduce((sum, loan) => sum + parseFloat(loan.remaining_amount), 0);
          this.totalRunningLoanAmount = 0;
          this.totalAppprovedLoanAmount = 0;
          this.totalPendingLoanAmount = 0;
          // this.totalCancelledLoanAmount = 0;
          this.totalCompletedLoanAmount = 0;

          this.totalRunningPendingAmount = 0;
          this.totalApprovedPendingAmount = 0;
          this.totalPendingPendingAmount = 0;
          // this.totalCancelledPendingAmount = 0;
          this.totalCompletedPendingAmount = 0;

          this.filteredDataarray = this.cancelledLoanListData;
          this.currentListFilterColoum = this.searchColumnsApply;
          this.currentlistFilterArray = this.cancelledLoanListData;
          this.loader = false;
        } else {
          this.loader = false;
        }
      }, error => {
        this.filteredDataarray = [];
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    } else {
      this._service.getLoanList(obj).subscribe((data: any) => {

        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.total_cusotomer = data.data.total_cusotomer;
          this.completedLoanCount = data.data.loans.length;
          // this.updateLoanValues('completed', data.data);

          this.runningLoanCount = 0;
          this.pendingLoanCount = 0;
          this.canceledLoanCount = 0;
          // this.completedLoanCount = 0;
          this.approvedLoanCount = 0;
          this.completedLoanListData = data.data.loans;
          this.totalCompletedLoanAmount = this.completedLoanListData.reduce((sum, loan) => sum + parseFloat(loan.loan_amount), 0);
          this.totalCompletedPendingAmount = this.runningLoanListData.reduce((sum, loan) => sum + parseFloat(loan.remaining_amount), 0);
          this.totalRunningLoanAmount = 0;
          this.totalAppprovedLoanAmount = 0;
          this.totalPendingLoanAmount = 0;
          this.totalCancelledLoanAmount = 0;
          // this.totalCompletedLoanAmount = 0;

          this.totalRunningPendingAmount = 0;
          this.totalApprovedPendingAmount = 0;
          this.totalPendingPendingAmount = 0;
          this.totalCancelledPendingAmount = 0;
          // this.totalCompletedPendingAmount = 0;

          this.filteredDataarray = this.completedLoanListData;
          this.currentListFilterColoum = this.searchColumnsLoan;
          this.currentlistFilterArray = this.completedLoanListData;
          this.loader = false;
        } else {
          this.loader = false;
        }
      }, error => {
        this.filteredDataarray = [];
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    }
  }

  updateLoanValues(type: any, loanArray: any) {
    debugger;
    this.total_paid_amount = 0;
    this.total_remaining_amount = 0;
    this.runningLoanCount = 0;
    this.approvedLoanCount = 0;
    this.pendingLoanCount = 0;
    this.canceledLoanCount = 0;
    this.completedLoanCount = 0;
    switch (type) {
      case "paid":
        if (loanArray.loans.length > 0) {
          debugger;
          this.runningLoanCount = loanArray.loans.length;
          // this.total_paid_amount = loanArray?.loans.reduce((sum loan: { loan_amount: string; }) => sum + parseFloat(loanArray?.loans.loan_amount), 0);
          // this.total_remaining_amount = loanArray?.loans.reduce((sum: number, loan: { remaining_amount: string; }) => sum + parseFloat(loanArray?.loans.remaining_amount), 0);
        }
        break;
      case 'approved':
        this.approvedLoanCount = loanArray.loans.length;
        break;
      case 'pending':
        this.pendingLoanCount = loanArray.loans.length;
        break;
      case 'cancelled':
        this.canceledLoanCount = loanArray.loans.length;
        break;
      case 'completed':
        this.completedLoanCount = loanArray.loans.length;

        break
      default:

        break;
    }
  }
  private isDialogOpen = false;
  openDialogMoreDetail(data: any, loantype: boolean): void {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      // panelClass: 'view_details_small_popup',
      data: {
        title: 'Loan Details',
        data: data,
        loantype: loantype
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
    });
  }

  openDialogCompleteLoanHistory(data: any) {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(CompleteLoanHistoryComponent, {
      data: {
        title: 'Loan History ',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
    });
  }

  openDialogInstallmentHistory(data: any) {
    const dialogRef = this.dialog.open(InstallmentHistoryComponent, {
      data: {
        title: 'Loan Instalment History',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogAssignMember(data: any) {
    const dialogRef = this.dialog.open(AssignMemberComponent, {
      disableClose: true,
      data: {
        title: 'Assign Loan Member',
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openDialogChangeMember(data: any) {
    const dialogRef = this.dialog.open(ChangeMemberComponent, {
      disableClose: true,

      data: {
        title: 'Update Loan Member',
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // let getindex =this.tabLabels[index];
        this.onTabChange(this.listType);
      }
    });
  }

  openDialogChangeStatus(data: any) {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      disableClose: true,
      // panelClass: 'view_details_small_popup',
      data: {
        title: 'Change Loan Status',
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onTabChange(this.listType);
      }
    });
  }

  openDialogPendingLoan(data: any) {
    const dialogRef = this.dialog.open(ActionForLoanComponent, {
      disableClose: true,
      data: {
        title: 'Update Loan Status',
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onTabChange(this.listType);
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
    this.filteredDataarray = this._customActionService.sortData(column, this.currentlistFilterArray);
  }

  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.currentlistFilterArray;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.currentListFilterColoum);
    }

  }
}
