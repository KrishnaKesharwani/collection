import { Component, inject } from '@angular/core';


@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {

  // columns = ['Loan No.', 'Customer No.', 'Logo', 'Name', 'Mobile', 'Assign', 'Loan Amt', 'Pending Amt', 'Status'];
  // loanData = [
  //   {},
  //   // Add more customer objects
  // ];

  // actions = [
  //   { action: 'installment_history', label: 'Installment History', icon: 'mdi mdi-history mr-2' },
  //   { action: 'assign_member', label: 'Assign Member', icon: 'mdi mdi-account-check-outline mr-2' },
  //   { action: 'change_member', label: 'Change Member', icon: 'mdi mdi-account-switch-outline mr-2' },
  //   { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
  //   { action: 'change_status', label: 'Change Status', icon: 'mdi mdi-account-off-outline mr-2' },
  // ];
  // filteredDataarray: any[] = [];
  // loanDataList: any[] = [];
  // loader: any;
  // constructor(public _customActionService: CustomActionsService, private actionService: ActionService, public _loanService: LoanService) { }

  ngOnInit() {

  }
  listLoadType: any = 'paid';
  loanList(listType: any) {
    debugger;
    this.listLoadType= listType;
  }

}
