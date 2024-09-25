import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompanyHistoryComponent } from './company-history/company-history.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ReceivedAmountComponent } from './received-amount/received-amount.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

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

  addMember(index: number) {

  }

  statusInactive() {

  }

  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(CompanyHistoryComponent, {
      width: '100%',

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
      width: '100%',

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
      width: '100%',

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
      width: '100%',

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
      width: '450px',
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

}
