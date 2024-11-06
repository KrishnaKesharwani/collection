import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { CompleteLoanHistoryComponent } from './complete-loan-history/complete-loan-history.component';

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
  total_cusotomer: any;
  searchColumnsLoan: any[] = ['loan_no', 'customer_no', 'name', 'loan_amount', 'remaining_amount'];
  searchColumnsApply: any[] = ['customer_no', 'name', 'applied_user_name', 'apply_date', 'remaining_amount'];
  searchTerm: string = '';
  currentlistFilterArray: any[] = [];
  currentListFilterColoum: any[] = [];
  readonly dialog = inject(MatDialog);

  constructor(public _customActionService: CustomActionsService, public _service: LoanService, public _tostr: ToastrService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
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

  onTabChange(index: any) {
    this.loader = true;
    const listType = this.tabLabels[index];
    this.listLoadType = listType;
    let obj = {
      company_id: this.company_id,
      loan_status: this.listLoadType,
      status: 'active'
    };
    if (obj.loan_status == 'paid') {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.total_cusotomer = data.data.total_cusotomer;
          this.runningLoanListData = data.data.loans;
          this.filteredDataarray = this.runningLoanListData;
          this.currentListFilterColoum = this.searchColumnsLoan;
          this.currentlistFilterArray = this.runningLoanListData;
          this.loader = false;
        }
      }, error => {
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    } else if (obj.loan_status == 'approved') {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.total_cusotomer = data.data.total_cusotomer;
          this.approvedLoanListData = data.data.loans;
          this.filteredDataarray = this.approvedLoanListData;
          this.currentListFilterColoum = this.searchColumnsLoan;
          this.currentlistFilterArray = this.approvedLoanListData;
          this.loader = false;
        }
      }, error => {
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    } else if (obj.loan_status == 'pending') {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.total_cusotomer = data.data.total_cusotomer;
          this.pendingLoanListData = data.data.loans;
          this.filteredDataarray = this.pendingLoanListData;
          this.currentListFilterColoum = this.searchColumnsApply;
          this.currentlistFilterArray = this.pendingLoanListData;
          this.loader = false;
        }
      }, error => {
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    } else if (obj.loan_status == 'cancelled') {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.total_cusotomer = data.data.total_cusotomer;
          this.cancelledLoanListData = data.data.loans;
          this.filteredDataarray = this.cancelledLoanListData;
          this.currentListFilterColoum = this.searchColumnsApply;
          this.currentlistFilterArray = this.cancelledLoanListData;
          this.loader = false;
        }
      }, error => {
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    } else {
      this._service.getLoanList(obj).subscribe((data: any) => {
        if (data.success) {
          this.total_remaining_amount = data.data.total_remaining_amount;
          this.total_cusotomer = data.data.total_cusotomer;
          this.completedLoanListData = data.data.loans;
          this.filteredDataarray = this.completedLoanListData;
          this.currentListFilterColoum = this.searchColumnsLoan;
          this.currentlistFilterArray = this.completedLoanListData;
          this.loader = false;
        }
      }, error => {
        this.total_remaining_amount = 0.00;
        this.total_cusotomer = 0;
        this.loader = false;
      });
    }
  }

  private isDialogOpen = false;
  openDialogMoreDetail(data: any): void {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        title: 'Loan Details',
        panelClass: 'view_details_small_popup',
        data: data
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
