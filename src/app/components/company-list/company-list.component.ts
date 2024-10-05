import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyHistoryComponent } from './company-history/company-history.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ReceivedAmountComponent } from './received-amount/received-amount.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import Swal from 'sweetalert2';
import { CompanyService } from 'src/app/services/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { ActionService } from 'src/app/services/action/action.service';

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
  // columns = ['Name', 'Logo', 'Owner Name', 'Mobile', 'Start Date', 'End Date', 'Plan', 'Amount', 'Pending', 'Status'];
  columns = [
    { prop: 'company_name', name: 'Name' },
    { prop: 'logo', name: 'Logo' },
    { prop: 'owner_name', name: 'Owner Name' },
    { prop: 'mobile', name: 'Mobile' },
    { prop: 'start_date', name: 'Start Date' },
    { prop: 'end_date', name: 'End Date' },
    { prop: 'plans', name: 'Plan' },
    { prop: 'total_amount', name: 'Amount' },
    { prop: 'advance_amount', name: 'Pending' },
    { prop: 'status', name: 'Status' }
  ];

  actions = [

    { action: 'collection_history', label: 'Collection History', icon: 'mdi mdi-history mr-2' },

    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'edit_company', label: 'Edit Company', icon: 'mdi mdi-pencil mr-2' },
    { action: 'received_amount', label: 'Received Amount', icon: 'mdi mdi-cash-100 mr-2' },
    { action: 'status', label: 'Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];
  constructor(private actionService: ActionService, private _toastr: ToastrService, public _service: CompanyService) { }

  ngOnInit() {

    this.getCompanyList();
  }

  getCompanyList() {

    this._service.getList().subscribe((response: any) => {

      if (response && Array.isArray(response.data)) {
        this.companyListData = response.data;

      }

    })
  }

  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {

      case 'collection_history':
        this.openDialog();
        break;
      case 'view_details':
        this.openDialog2();
        break;
      case 'edit_company':
        this.openDialog3(actionData.row);
        break;
      case 'received_amount':
        this.openDialog4();
        break;
      case 'status':
        this.openDialog5('1ms', '5ms', actionData.row);
        break;
    }
  }



  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(CompanyHistoryComponent, {

      data: {
        title: 'Company Plan History Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  readonly dialog2 = inject(MatDialog);
  openDialog2() {
    const dialogRef = this.dialog2.open(ViewDetailsComponent, {


      data: {
        title: 'Company Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  readonly dialog3 = inject(MatDialog);
  openDialog3(data: any) {
    const dialogRef = this.dialog3.open(AddCompanyComponent, {

      disableClose: true,
      data: {
        id: data.id,
        title: 'Update Members Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  readonly dialog4 = inject(MatDialog);
  openDialog4() {
    const dialogRef = this.dialog4.open(ReceivedAmountComponent, {
      disableClose: true,
      data: {
        title: 'Received Plan Amount',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialog5(enterAnimationDuration: string, exitAnimationDuration: string, data?: any): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {

      enterAnimationDuration,
      exitAnimationDuration,
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
      status: data.status
    };


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
      this.getCompanyList();
    });


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




}
