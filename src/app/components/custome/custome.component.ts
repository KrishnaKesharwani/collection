import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { ProviderLoanComponent } from './provider-loan/provider-loan.component';
import { ViewCustomerListComponent } from './view-customer-list/view-customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import Swal from 'sweetalert2';
import { CustomerBulkImportComponent } from './customer-bulk-import/customer-bulk-import.component';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
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

  columns = [
    // { prop: 'company_name', name: 'Customer No.', orderable: true },
    { prop: 'name', name: 'Name', orderable: true },
    { prop: 'mobile', name: 'Mobile', orderable: false },
    { prop: 'aadhar_no', name: 'Aadhar No.', orderable: false },
    { prop: 'loan_amount', name: 'Loan Amount', orderable: false },
    { prop: 'pending_amount', name: 'Pending Amount', orderable: false },
    { prop: 'status', name: 'Status', orderable: false }
  ];
  actions = [
    { action: 'loan_history', label: 'Loan History', icon: 'mdi mdi-history' },
    { action: 'provide_loan', label: 'Provide Loan', icon: 'mdi mdi-cash-100' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'edit_customer', label: 'Edit Customer', icon: 'mdi mdi-pencil mr-2' },
    { action: 'status', label: 'Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];
  company_id: any;
  customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;

  constructor(public _customActionService: CustomActionsService, public _service: CustomerService, private actionService: ActionService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
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
    })
  }

  onAction(actionData: { action: string; row: any }) {
    this.actionService.setAction(actionData);
    switch (actionData.action) {
      case 'loan_history':
        this.openDialogLoanHistory();
        break;
      case 'provide_loan':
        this.openDialogProvideLoan();
        break;
      case 'view_details':
        this.openDialogViewDetail(actionData.row);
        break;
      case 'edit_customer':
        this.openDialogEditCustomer(actionData.row);
        break;
      case 'status':
        this.openDialogChangeStatus('0ms', '0ms', actionData.row);
        break;
    }
  }

  openDialogChangeStatus(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Are you sure?',
        subTitle: data && data.status === 'active'
          ? 'You want to inactivate customer status!'
          : 'You want to activate customer status!'
      }
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete(data);
    });
  }

  delete(data: any) {
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
          timer: 1500
        });
      }
    });
    this.getCustomerList();
  }

  private isDialogOpen = false;
  openDialogLoanHistory() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(LoanHistoryComponent, {
      disableClose: true,
      data: {
        title: 'Customer Loan History Details',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.isDialogOpen = false;
    });
  }

  openDialogProvideLoan(): void {
    if (this.isDialogOpen) return;
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(ProviderLoanComponent, {
      disableClose: true,
      data: {
        title: 'Loan Provide Details'
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      // this.delete();
      this.isDialogOpen = false;
    });
  }

  openDialogApplyLoan() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ApplyLoanComponent, {
      disableClose: true,
      data: {
        title: 'Loan Apply Details'
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      // this.delete();
      this.isDialogOpen = false;
    });
  }
  openDialogViewDetail(data: any): void {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(ViewCustomerListComponent, {
      data: {
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
      data: {
        title: 'Update Customer Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
    });
  }

  openDialogAddCustomer() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(AddCustomerComponent, {
      disableClose: true,
      data: {
        title: 'Add New Customer'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
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
  }

  fetchCustomreData() {
    // this.customerService.getCustomers().subscribe(
    //   (data) => {
    //     this.tableData = data;
    //   },
    //   (error) => {
    //   }
    // );
  }

  // openDialogDownload() {

  //   const header = [
  //     'Customer No.',
  //     'Name',
  //     'Mobile',
  //     'Aadhar No.',
  //     'Loan Amt',
  //     'Pending Amt',
  //     'Status'
  //   ];

  //   const rows = this.tableData.map(data => [
  //     data.customerNo,
  //     data.name,
  //     data.mobile,
  //     data.aadharNo,
  //     data.loanAmt,
  //     data.pendingAmt,
  //     data.status
  //   ]);

  //   const worksheetData = [header, ...rows];
  //   // Create a new workbook
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheetData);
  //   const workbook: XLSX.WorkBook = XLSX.utils.book_new();

  //   // Append the worksheet to the workbook
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  //   // Generate buffer
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  //   // Create a Blob from the buffer
  //   const data: Blob = new Blob([excelBuffer], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   });

  //   // Save the file
  //   saveAs(data, 'table-data.xlsx');
  // }
  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.customerData);
  }

  searchColumns: any[] = ['name', 'status', 'mobile', 'email', 'customer_no'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.customerData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
    // console.log('after Filter Data', this.filteredDataarray);
  }

}
