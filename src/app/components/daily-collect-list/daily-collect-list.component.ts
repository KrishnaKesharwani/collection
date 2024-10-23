import { Component } from '@angular/core';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';

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

  constructor(public _customActionService: CustomActionsService, public _service: DailyCollectionService, private actionService: ActionService) {

  }
  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.member_id = userData?.member_id;
      this.customer_id = userData?.customer_id;
      this.userType = userData.user_type;
    }

    if (this.member_id) {
      this.collection_type = 'Deposit'

      this.getMemberLoanList();
      this.getDepsitForMember();
    }
    else {
      this.collection_type = 'Loan'
      this.getCustomerLoanList();
      this.getDepsitForCustomer();
    }

  }

  getMemberLoanList() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id,
      loan_status: 'Approved',
      status: "Active"
    }
    this._service.getMemberLoanList(obj).subscribe((data: any) => {
      console.log(data.data);
      this.memberLoanData = data.data.loans;
    })
  }

  getCustomerLoanList() {
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id,
      loan_status: 'Approved',
      status: "Active"
    }
    this._service.getCustomerLoanList(obj).subscribe((data: any) => {
      console.log(data.data);

      this.loanData = data.data.loans;
      this.loanDataNotFound = data.success;
    })
  }

  get(data: any) {

    this.collection_type = data
  }

  getDepsitForMember() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id,

      status: "Active"
    }
    this._service.getDepositListForMember(obj).subscribe((data: any) => {
      console.log(data.data);
      this.memberDepositData = data.data.deposits;
    })
  }
  getDepsitForCustomer() {
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id,

      status: "Active"
    }
    this._service.getDepositListForCustomer(obj).subscribe((data: any) => {
      console.log(data.data);
      this.customerDepositData = data.data.deposits;
    })
  }

}
