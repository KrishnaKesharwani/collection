import { Component, inject, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import Swal from 'sweetalert2';
// import { ViewDetailsComponent } from '../fixed-deposit/view-details/view-details.component';
import { CompanyHistoryComponent } from '../company-list/company-history/company-history.component';
import { ViewDetailsComponent } from '../company-list/view-details/view-details.component';
import { SuperAdminDashboardService } from 'src/app/services/dashboard/super-admin-dashboard.service';
import { ActionService } from 'src/app/services/action/action.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.scss']
})
export class SuperadminDashboardComponent {
  companyListData: any[] = [];
  filteredDataarray: any[] = [];
  readonly dialog = inject(MatDialog);
  noRecordsFound: boolean = false;
  loader = false;
  filterStateManagement: any;

  constructor(public _customActionService: CustomActionsService, public _dashboardService: SuperAdminDashboardService, private actionService: ActionService, private _toastr: ToastrService, public _service: CompanyService) {
  }

  ngOnInit() {
    this.getExpeiredCompanyList();
  }
  // get filteredData() {
  //   return this.companyListData.filter(item =>
  //     item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
  getExpeiredCompanyList() {
    this.loader = true;
    let obj = {
      upcoming_expire: 1
    }
    this._service.getExpeiredCompanyList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        if (response) {
          this.companyListData = response.data;
          this.filteredDataarray = this.companyListData;
          this.loader = false;
        }
        else {
          this.companyListData = [];
          this.filteredDataarray = this.companyListData;
          this.loader = false;
        }
      }
    })
  }

  openDialogCompanyHistory(id: any) {
    const dialogRef = this.dialog.open(CompanyHistoryComponent, {
      data: {
        title: 'Company Plan History Details',
        id: id
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogVieDetails(data: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        title: 'Company Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogStatus(enterAnimationDuration: string, exitAnimationDuration: string, data?: any): void {
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
      this.updateStatus(data);
    });
  }

  updateStatus(data: any) {
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
    this.getExpeiredCompanyList();
  }
  addData(arg0: any, dataDisplay: any, row: any) {
    throw new Error('Method not implemented.');
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


  isAsc: boolean = true;
  sortTableData(column: string, responseData: any) {

    this.filteredDataarray = this._customActionService.sortData(column, responseData);


  }
}
