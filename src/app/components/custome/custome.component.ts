import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { ProviderLoanComponent } from './provider-loan/provider-loan.component';
import { ViewCustomerListComponent } from './view-customer-list/view-customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import Swal from 'sweetalert2';
import { CustomerBulkImportComponent } from './customer-bulk-import/customer-bulk-import.component';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ActionService } from 'src/app/services/action/action.service';
@Component({
  selector: 'app-custome',
  templateUrl: './custome.component.html',
  styleUrls: ['./custome.component.scss']
})
export class CustomeComponent {

  usertype: any;
  customer_action: any;
  tableData: any[] = [];
  columns = ['Customer No.', 'Name', 'Mobile', 'Aadhar No.', 'Loan Amount', 'Pending Amount', 'Status'];
  customerData = [
    { customerNo: 1, name: 'John Doe', mobile: '1234567890', aadharNo: '1111-2222-3333', loanAmt: 50000, pendingAmt: 10000, status: 'Active' },
    // Add more customer objects
  ];

  actions = [
    { action: 'loan_history', label: 'Loan History', icon: 'mdi mdi-history' },
    { action: 'provide_loan', label: 'Provide Loan', icon: 'mdi mdi-cash-100' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'edit_customer', label: 'Edit Customer', icon: 'mdi mdi-pencil mr-2' },
    { action: 'status', label: 'Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];

  constructor(private actionService: ActionService, public dialog: MatDialog) { }

  ngOnInit() {

  }


  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {
      case 'loan_history':
        this.openDialog2();
        break;
      case 'provide_loan':
        this.openDialog3();
        break;
      case 'view_details':
        this.openDialog4();
        break;
      case 'edit_customer':
        this.openDialog5();
        break;
      case 'status':
        this.openDialog('0ms', '0ms');
        break;
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {

      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Are you sure?',
        subTitle: 'You wont be inactive customer status!',

      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete();
    });
  }

  delete(e?: any) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: 'Success',
      text: "Customer status updated successfully...",
      showConfirmButton: true,
      timer: 1500
    });
  }

  private isDialogOpen = false;
  readonly dialog2 = inject(MatDialog);
  openDialog2() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog2.open(LoanHistoryComponent, {
      disableClose: true,

      data: {
        title: 'Customer Loan History Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.isDialogOpen = false;
    });
  }

  readonly dialog3 = inject(MatDialog);
  openDialog3(): void {
    if (this.isDialogOpen) return;
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog3.open(ProviderLoanComponent, {
      disableClose: true,

      data: {
        title: 'Loan Provide Details'
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete();
      this.isDialogOpen = false;
    });
  }


  readonly dialog4 = inject(MatDialog);

  openDialog4(): void {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog4.open(ViewCustomerListComponent, {


      data: {
        title: 'Customer Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
    });
  }

  readonly dialog5 = inject(MatDialog);

  openDialog5() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog5.open(AddCustomerComponent, {
      disableClose: true,

      data: {
        title: 'Update Customer Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
    });
  }

  readonly dialog6 = inject(MatDialog);
  openDialog6() {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog6.open(AddCustomerComponent, {
      disableClose: true,
      data: {
        title: 'Add New Customer'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isDialogOpen = false;
    });
  }
  readonly dialog7 = inject(MatDialog);
  openDialogImport() {
    const dialogRef = this.dialog7.open(CustomerBulkImportComponent, {
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


  readonly dialog8 = inject(MatDialog);

  openDialogDownload() {

    const header = [
      'Customer No.',
      'Name',
      'Mobile',
      'Aadhar No.',
      'Loan Amt',
      'Pending Amt',
      'Status'
    ];

    const rows = this.tableData.map(data => [
      data.customerNo,
      data.name,
      data.mobile,
      data.aadharNo,
      data.loanAmt,
      data.pendingAmt,
      data.status
    ]);

    const worksheetData = [header, ...rows];
    // Create a new workbook
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate buffer
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the buffer
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    // Save the file
    saveAs(data, 'table-data.xlsx');
  }


}
