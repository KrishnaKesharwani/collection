import { Component, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MassageForApplierComponent } from './massage-for-applier/massage-for-applier.component';
import { ActionForLoanComponent } from './action-for-loan/action-for-loan.component';
// import { ViewDetailsComponent } from './view-details/view-details.component';
import { LoanService } from 'src/app/services/loan/loan.service';
import { InstallmentHistoryComponent } from '../loan-list/installment-history/installment-history.component';
import { ActionForDepositComponent } from './action-for-deposit/action-for-deposit.component';
import { DepositRequestService } from 'src/app/services/depositRequest/deposit-request.service';
import { ViewDetailsComponent } from '../request-money/view-details/view-details.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  animal!: string;
  name!: string;
  userType: any;
  company_id: any;
  loanData: any[] = [];
  dashboardData: any;
  newLoanData: any[] = [];
  newLoanDashboardData: any;
  loader: boolean = false;
  requestList: any[] = [];
  constructor(public dialog: MatDialog, public _service: LoanService, public _requestservice: DepositRequestService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.userType = userData.user_type;
      this.company_id = userData.company_id;
    } else {
      this.userType = null; // or set a default value
    }

    this.getCompletedLoanList();
    this.getApplyNewLoanList();
    this.getRequestLoanList();
  }

  openDialogLoanHistory(data?: any): void {
    const dialogRef = this.dialog.open(InstallmentHistoryComponent, {
      disableClose: true,
      data: {
        title: 'Loan History',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  submitMessage() {

  }

  readonly dialog2 = inject(MatDialog);
  openDialogViewDetails(data?: any) {
    const dialogRef = this.dialog2.open(ViewDetailsComponent, {
      data: {
        data: data,
        title: 'Request Details',
      },
    });
  }

  readonly dialog3 = inject(MatDialog);
  openDialogActionForLoan(data?: any) {
    const dialogRef = this.dialog3.open(ActionForLoanComponent, {
      data: {
        title: 'Message For Applier',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogActionForDeposit(data?: any) {
    const dialogRef = this.dialog3.open(ActionForDepositComponent, {
      panelClass: 'medium_popup',
      data: {
        title: 'Message For Deposit',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRequestLoanList();
      }
    });
  }

  getCompletedLoanList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      loan_status: 'completed',
      status: 'active'
    };
    this._service.getLoanList(obj).subscribe((data: any) => {
      this.loanData = data.data.loans;
      this.dashboardData = data.data;
      this.loader = false;
    })
  }

  getApplyNewLoanList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      loan_status: 'pending',
      status: 'active'
    };
    this._service.getLoanList(obj).subscribe((data: any) => {
      this.newLoanData = data.data.loans;
      this.newLoanDashboardData = data.data;
      this.loader = false;

    })
  }

  getRequestLoanList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      // loan_status: 'Approved',
      // status: 'Active'
    }
    this._requestservice.getRequestMoney(obj).subscribe((data: any) => {
      this.loader = false;
      this.requestList = data.data;
    }, error => {
      this.loader = false;
      // this._tostr.error(error.error.message, 'Error');
    })
  }
}
