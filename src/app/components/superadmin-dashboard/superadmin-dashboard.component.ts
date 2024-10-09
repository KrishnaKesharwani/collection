import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.scss']
})
export class SuperadminDashboardComponent {
  companyListData: any[] = [];
  readonly dialog = inject(MatDialog);
  noRecordsFound: boolean = false;
  loader = false;

  constructor(public _dashboardService: SuperAdminDashboardService, private actionService: ActionService, private _toastr: ToastrService, public _service: CompanyService) {
  }

  ngOnInit() {
    this.getExpeiredCompanyList();
  }

  getExpeiredCompanyList() {
    this.loader = true;
    let obj = {
      upcoming_expire: 1
    }
    this._service.getExpeiredCompanyList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        if (response) {
          this.companyListData = response.data;
          this.loader = false;
        }
        else {
          this.companyListData = [];
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

  // change_status = true;
  // status_massage = "";
  // openDialogStatus(enterAnimationDuration: string, exitAnimationDuration: string, current_status: string): void {
  //   // this.dataForDelete = enterAnimationDuration
  //   if(current_status == 'inactive'){
  //     this.change_status = true;
  //     this.status_massage == 'You wont to be active this company!';
  //   }else{
  //     this.change_status == false;
  //     this.status_massage == 'You wont to be inactive this company!'
  //   }
  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     panelClass: 'delete_popup',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //     data: {
  //       title: 'Are You Sure?',
  //       subTitle: this.status_massage,
  //     },
  //   });
  //   dialogRef.componentInstance.deleteAction.subscribe(() => {
  //     this.delete();
  //   });
  // }

  // delete(e?: any) {
  //   Swal.fire({
  //     position: "center",
  //     icon: "success",
  //     title: 'Success',
  //     text: "Company status updated successfully...",
  //     showConfirmButton: true,
  //     timer: 1500
  //   });
  // }

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
    this.getExpeiredCompanyList();
  }
}
