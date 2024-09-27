import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyHistoryComponent } from './company-history/company-history.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ReceivedAmountComponent } from './received-amount/received-amount.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { AddCompanyComponent } from './add-company/add-company.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
  customer_action: any;

  ngOnInit() {

  }

  statusActive() {

  }


  statusInactive() {

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

  readonly dialog3 = inject(MatDialog);
  openDialog3() {
    const dialogRef = this.dialog3.open(EditCustomerComponent, {


      data: {
        title: 'Update Members Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly dialog4 = inject(MatDialog);
  openDialog4() {
    const dialogRef = this.dialog4.open(ReceivedAmountComponent, {

      data: {
        title: 'Received Plan Amount',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog5(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {

      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Delete This Record?',
        subTitle: 'You wont be inactive member status!',
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete();
    });
  }
  delete(e?: any) {
    alert('delete api');
  }

  readonly dialog7 = inject(MatDialog);
  openDialog7(enterAnimationDuration: string, exitAnimationDuration: string): void {
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
      this.delete();
    });
  }

  readonly dialog6 = inject(MatDialog);
  openDialog6() {
    const dialogRef = this.dialog6.open(AddCompanyComponent, {
      width: 'auto',
      data: {
        title: 'Add New Company'
      },
    });

  }




}
