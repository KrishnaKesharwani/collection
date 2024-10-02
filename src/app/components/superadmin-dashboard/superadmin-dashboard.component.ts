import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import Swal from 'sweetalert2';
// import { ViewDetailsComponent } from '../fixed-deposit/view-details/view-details.component';
import { CompanyHistoryComponent } from '../company-list/company-history/company-history.component';
import { ViewDetailsComponent } from '../company-list/view-details/view-details.component';

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.scss']
})
export class SuperadminDashboardComponent {

  ngOnInit() {

  }

  submitMessage() {

  }

  statusInactive() {

  }

  statusActive() {

  }

  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(CompanyHistoryComponent, {

      data: {
        title: 'Company Plan History Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
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
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly dialog7 = inject(MatDialog);
  openDialog7(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog7.open(DeleteComponent, {
      disableClose: true,
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
