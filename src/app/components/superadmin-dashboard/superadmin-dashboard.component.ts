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

  constructor(public _dashboardService: SuperAdminDashboardService, private actionService: ActionService, private _toastr: ToastrService, public _service: CompanyService) {

  }
  ngOnInit() {
    this.getExpeiredCompanyList();
  }

  getExpeiredCompanyList() {
    let obj = {
      upcoming_expire: 1
    }
    this._service.getExpeiredCompanyList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        if (response) {
          this.companyListData = response.data;

        }
        else {
          this.companyListData = [];

        }

      }
    })
  }




  openDialogCompanyHistory() {
    const dialogRef = this.dialog.open(CompanyHistoryComponent, {

      data: {
        title: 'Company Plan History Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


  openDialogVieDetails() {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {


      data: {
        title: 'Company Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


  openDialogStatus(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {

      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Are You Sure?',
        subTitle: 'You wont to be inactive company!',
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
      text: "Company status updated successfully...",
      showConfirmButton: true,
      timer: 1500
    });
  }
}
