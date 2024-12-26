import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { ProviderLoanComponent } from './provider-loan/provider-loan.component';
import { ViewCustomerListComponent } from './view-customer-list/view-customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import Swal from 'sweetalert2';
import { CustomerBulkImportComponent } from './customer-bulk-import/customer-bulk-import.component';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { NewDepositComponent } from './new-deposit/new-deposit.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custome',
  templateUrl: './custome.component.html',
  styleUrls: ['./custome.component.scss']
})

export class CustomeComponent {
  usertype: any;
  customer_action: any;
  tableData: any[] = [];
  readonly dialog = inject(MatDialog);
  company_id: any;
  customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;
  user_type: any;

  constructor(public _customActionService: CustomActionsService,
    public _service: CustomerService,
    public toaster: ToastrService
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.user_type = userData.user_type;
    }
    this.getCustomerList();
  }

  getCustomerList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id
    }
    this._service.getList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.customerData = response.data;
        this.filteredDataarray = this.customerData;
        this.loader = false;
      }
    }, error => {
      this.loader = false;

    })
  }

  openDialogChangeStatus(data: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete_popup',
      data: {
        title: 'Are you sure?',
        subTitle: data && data.status === 'active'
          ? 'You want to inactivate customer status!'
          : 'You want to activate customer status!'
      }
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.updateStatus(data);
    });
  }

  updateStatus(data: any) {
    let obj = {
      customer_id: data.id,
      status: data.status == 'active' ? 'inactive' : 'active'
    }
    this._service.changeStatus(obj).subscribe((data: any) => {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Success',
          text: 'Customer Status Updated!',
          showConfirmButton: true,
          timer: 500
        });
        this.getCustomerList();
      }
    });

  }

  private isDialogOpen = false;
  openDialogLoanHistory(data: any) {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(LoanHistoryComponent, {

      data: {
        data: data,
        title: 'Customer Loan History Details',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.isDialogOpen = false;
    });
  }

  openDialogProvideLoan(data: any): void {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ProviderLoanComponent, {
      disableClose: true,
      data: {
        data: data,
        title: 'New Loan Provide Details'
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getCustomerList();
      }
    });
  }

  openDialogNewDeposit(data: any) {
    if (this.isDialogOpen) return;
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(NewDepositComponent, {
      disableClose: true,
      data: {
        data: data,
        title: 'Add New Deposit'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCustomerList();
      }
    });
  }

  openDialogApplyLoan(data: any) {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ApplyLoanComponent, {
      disableClose: true,
      data: {
        data: data,
        title: 'Loan Apply Details'
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.isDialogOpen = false;
    });
  }

  openDialogViewDetail(data: any): void {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ViewCustomerListComponent, {
      data: {
        panelClass: 'view_details_small_popup',
        title: 'Customer Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
    });
  }

  openDialogEditCustomer(data: any) {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      disableClose: true,
      panelClass: 'full_width_popup',
      data: {
        title: 'Update Customer Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCustomerList();
      }
    });
  }

  openDialogAddCustomer() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      disableClose: true,
      panelClass: 'full_width_popup',
      data: {
        title: 'Add New Customer'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCustomerList();
      }
    });
  }

  openDialogImport() {
    const dialogRef = this.dialog.open(CustomerBulkImportComponent, {
      disableClose: true,
      panelClass: 'fullwidth_model',
      data: {
        title: 'Import Customers'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCustomerList();
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
    this.filteredDataarray = this._customActionService.sortData(column, this.customerData);
  }

  searchColumns: any[] = ['name', 'status', 'mobile', 'email', 'customer_no', 'running_loan_count', 'deposit_count'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.customerData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }

}
