import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CompanyHistoryComponent } from './company-history/company-history.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ReceivedAmountComponent } from './received-amount/received-amount.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import Swal from 'sweetalert2';
import { CompanyService } from 'src/app/services/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  customer_action: any;
  companyListData: any[] = [
  ]
  companyDashboardtData: any;
  loader = false;
  readonly dialog = inject(MatDialog);
  // columns = ['Name', 'Logo', 'Owner Name', 'Mobile', 'Start Date', 'End Date', 'Plan', 'Amount', 'Pending', 'Status'];
  columns = [
    { prop: 'company_name', name: 'Name', orderable: true },
    { prop: 'main_logo', name: 'Logo', orderable: false, isImage: true },
    { prop: 'owner_name', name: 'Owner Name', orderable: true },
    { prop: 'mobile', name: 'Mobile', orderable: false },
    { prop: 'start_date', name: 'Start Date', orderable: false },
    { prop: 'end_date', name: 'End Date', orderable: false },
    { prop: 'plans', name: 'Plan', orderable: false },
    { prop: 'total_amount', name: 'Amount', orderable: false },
    { prop: 'advance_amount', name: 'Pending', orderable: false },
    { prop: 'status', name: 'Status', orderable: false }
  ];

  actions = [
    { action: 'collection_history', label: 'Collection History', icon: 'mdi mdi-history mr-2' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'edit_company', label: 'Edit Company', icon: 'mdi mdi-pencil mr-2' },
    // { action: 'received_amount', label: 'Received Amount', icon: 'mdi mdi-cash-100 mr-2' },
    { action: 'status', label: 'Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];
  filteredDataarray: any[] = [];
  constructor(public _customActionService: CustomActionsService, private actionService: ActionService, private _toastr: ToastrService, public _service: CompanyService

  ) { }

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList() {
    this._service.getList().subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.companyListData = response.data;
        this.filteredDataarray = this.companyListData;
      }
    })
  }

  searchTerm: string = '';

  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    this.filteredData();
  }

  filteredData() {
    this.filteredDataarray = this.companyListData.filter(item =>
      item.company_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.owner_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.advance_amount.includes(this.searchTerm) ||
      item.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.mobile.includes(this.searchTerm)
    );
  }

  onAction(actionData: { action: string; row: any }) {
    this.actionService.setAction(actionData);
    switch (actionData.action) {
      case 'collection_history':
        this.openDialogCompanyPlan(actionData.row);
        break;
      case 'view_details':
        this.openDialogViewDetails(actionData.row);
        break;
      case 'edit_company':
        this.openDialogEditDetails(actionData.row);
        break;
      // case 'received_amount':
      //   this.openDialogReceiveAmount(actionData.row);
      //   break;
      case 'status':
        this.openDialogStatus('1ms', '5ms', actionData.row);
        break;
    }
  }

  openDialogCompanyPlan(row: any) {

    const dialogRef = this.dialog.open(CompanyHistoryComponent, {
      data: {
        id: row.id,
        title: row.company_name + ' Plan History Details',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogViewDetails(row: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        data: row,
        title: 'Company Details',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogEditDetails(data: any) {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      disableClose: true,
      data: {
        data: data,
        title: 'Update Company Details',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogReceivePlanAmount() {
    const dialogRef = this.dialog.open(ReceivedAmountComponent, {
      disableClose: true,
      data: {
        title: 'Received Plan Amount',
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogStatus(enterAnimationDuration: string, exitAnimationDuration: string, data?: any): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
      panelClass: 'delete_popup',
      data: {
        title: 'Are you sure?',
        subTitle: data && data.status === 'active'
          ? 'You want to inactivate company status!'
          : 'You want to activate company status!'
      }
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete(data);
    });
  }

  delete(data: any) {
    let obj = {
      company_id: data.id,
      status: data.status == 'active' ? 'inactive' : 'active'
    }

    this._service.changeStatus(obj).subscribe((data: any) => {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Success',
          text: 'Company Status Updated!',
          showConfirmButton: true,
          timer: 1500
        });
      }

    });
    this.getCompanyList();
  }

  readonly dialog7 = inject(MatDialog);
  openDialog7(enterAnimationDuration: string, exitAnimationDuration: string, data?: any): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog7.open(DeleteComponent, {
      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Are You Sure?',
        subTitle: 'You wont to be inactive company!',
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete(data);
    });
  }

  readonly dialog6 = inject(MatDialog);
  openDialog6() {
    const dialogRef = this.dialog6.open(AddCompanyComponent, {
      disableClose: true,
      width: 'auto',
      data: {
        title: 'Add New Company'
      },
    });

  }


  isAsc: boolean = true;
  sortTableData(column: string, responseData: any) {

    this.filteredDataarray = this._customActionService.sortData(column, responseData);


  }

}
