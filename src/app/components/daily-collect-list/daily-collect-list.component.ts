import { Component } from '@angular/core';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';
import { InstallmentHistoryComponent } from '../loan-list/installment-history/installment-history.component';
import { MatDialog } from '@angular/material/dialog';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daily-collect-list',
  templateUrl: './daily-collect-list.component.html',
  styleUrls: ['./daily-collect-list.component.scss']
})
export class DailyCollectListComponent {
  userType: any;
  company_id: any;
  member_id: any[] = [];
  memberLoanData: any[] = [];
  customer_id: any;
  loanData: any[] = [];
  loanDataNotFound: any;
  memberDepositData: any;
  customerDepositData: any;
  collection_type: any;
  loading = true;
  constructor(public dialog: MatDialog, public _customActionService: CustomActionsService, public _service: DailyCollectionService, private actionService: ActionService, private _dataSharingService: DataSharingService, private _router: Router) {

  }
  ngOnInit() {
    const data: any = localStorage.getItem('CurrentUser');
    const userData = JSON.parse(data);
    this.userType = userData.user_type;
    if (data) {
      this.company_id = userData.company_id;
      this.member_id = userData?.member_id;
      this.customer_id = userData?.customer_id;
    }
    if (this.userType == 2) {
      this.collection_type = 'Deposit';
      this.getMemberLoanList();
      this.getDepsitForMember();
    } else {
      this.collection_type = 'Loan';
      this.getCustomerLoanList();
      this.getDepsitForCustomer();
    }
  }

  getMemberLoanList() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id,
      loan_status: 'paid',
      status: "Active"
    }
    this._service.getMemberLoanList(obj).subscribe((data: any) => {
      this.memberLoanData = data.data.loans;
    })
  }
  getDepsitForMember() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id,
      status: "Active"
    }
    this._service.getDepositListForMember(obj).subscribe((data: any) => {
      this.memberDepositData = data.data.deposits;
      this.loading = false;
    })
  }

  collectTypeClick: any;
  collectMoneyType(collectType: any) {

    this.collectTypeClick = collectType;
  }

  getCustomerLoanList() {
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id,
      loan_status: 'Approved',
      status: "Active"
    }
    this._service.getCustomerLoanList(obj).subscribe((data: any) => {
      this.loanData = data.data.loans;
      this.loanDataNotFound = data.success;
    })
  }
  getDepsitForCustomer() {
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id,
      status: "Active"
    }
    this._service.getDepositListForCustomer(obj).subscribe((data: any) => {
      this.customerDepositData = data.data.deposits;
      this.loading = false;
    })
  }

  viewDetails(deposit: any, collectTypeClick: any): void {

    // this.collectTypeClick = collectType;
    this._dataSharingService.setDepositData(deposit, collectTypeClick);
    this._router.navigate(['/paid_data_entry', deposit.id]);
  }

  loanViewDetails(loan: any, collectTypeClick: any) {

    // this.collectTypeClick = collectType;
    this._dataSharingService.setLoanData(loan, collectTypeClick);
    this._router.navigate(['/paid_data_entry', loan.id]);
  }

  openDialogInstallmentHistory(data: any) {

    const dialogRef = this.dialog.open(InstallmentHistoryComponent, {
      data: {
        title: 'Loan Instalment History',
        data: data
      },
    });
  }

  get(data: any) {
    this.collection_type = data;
  }



}
