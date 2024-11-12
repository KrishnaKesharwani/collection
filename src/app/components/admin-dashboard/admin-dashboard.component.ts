import { Component, inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MassageForApplierComponent } from './massage-for-applier/massage-for-applier.component';
import { ActionForLoanComponent } from './action-for-loan/action-for-loan.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { LoanService } from 'src/app/services/loan/loan.service';
import { InstallmentHistoryComponent } from '../loan-list/installment-history/installment-history.component';

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
  loanData: any;
  dashboardData: any;
  newLoanData: any;
  newLoanDashboardData: any;
  constructor(public dialog: MatDialog, public _service: LoanService) { }
  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.userType = userData.user_type;
      this.company_id = userData.company_id;
    } else {
      this.userType = null; // or set a default value
    }

    this.getCompletedLoanList();
    this.getApplyNewLoanList();
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



  // start view details
  readonly dialog2 = inject(MatDialog);
  openDialogViewDetails(data?: any) {
    const dialogRef = this.dialog2.open(ViewDetailsComponent, {


      data: {
        data: data,
        title: 'Apply Loan Coustomer Details',

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
  }

  getCompletedLoanList() {
    let obj = {
      company_id: this.company_id,
      loan_status: 'completed',
      status: 'active'
    };
    this._service.getLoanList(obj).subscribe((data: any) => {
      this.loanData = data.data.loans;
      this.dashboardData = data.data;

    })
  }

  getApplyNewLoanList() {
    let obj = {
      company_id: this.company_id,
      loan_status: 'pending',
      status: 'active'
    };
    this._service.getLoanList(obj).subscribe((data: any) => {
      this.newLoanData = data.data.loans;
      this.newLoanDashboardData = data.data;

    })
  }
}
