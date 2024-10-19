import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { LoanService } from 'src/app/services/loan/loan.service';


@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent {
  loanListData: any[] = [];
  filteredDataarray: any;
  company_id: any;
  loader: boolean = false;

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
  constructor(public _customActionService: CustomActionsService, public _service: LoanService, public _tostr: ToastrService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      // this.user_type = userData.user_type;
    }
  }


  selectedTabIndex: number = 3;  // Default to 'Approved' tab

  listLoadType: any;  // Default to 'approved'

  tabLabels: string[] = ['running', 'pending', 'cancelled', 'approved'];

  onTabChange(index: any) {
    this.loader = true;
    const listType = this.tabLabels[index];
    this.listLoadType = listType;

    let obj = {
      company_id: this.company_id,
      loan_status: this.listLoadType,
      status: 'Active'
    };

    this._service.getLoanList(obj).subscribe((data: any) => {

      this.loanListData = data.data;

      this._tostr.success(data.message, "Succes");
      this.loader = false
    }, error => {
      this.loader = false;
      this._tostr.error(error.error.message, 'Error');

    });
  }
  completeLoanHistory(loanDetails: any){

  }
  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.loanListData);


  }

  searchColumns: any[] = ['name', 'status', 'mobile', 'email', 'customer_no'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.loanListData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }

  }
}
