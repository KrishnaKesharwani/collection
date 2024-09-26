import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { ProviderLoanComponent } from './provider-loan/provider-loan.component';
import { ViewCustomerListComponent } from './view-customer-list/view-customer-list.component';
import { EditCustomerListComponent } from './edit-customer-list/edit-customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

@Component({
  selector: 'app-custome',
  templateUrl: './custome.component.html',
  styleUrls: ['./custome.component.scss']
})
export class CustomeComponent {

  usertype: any;
  customer_action: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  statusActive() {

  }

  addMember(number: any) {

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
    alert('delete api');
  }

  readonly dialog2 = inject(MatDialog);
  openDialog2() {
    const dialogRef = this.dialog2.open(LoanHistoryComponent, {
      width: '100%',

      data: {
        title: 'Customer Loan History Details',

      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog3(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(ProviderLoanComponent, {
      width: '850px',
      data: {
        title: 'Loan Provide Details'
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete();
    });
  }


  readonly dialog4 = inject(MatDialog);

  openDialog4() {
    const dialogRef = this.dialog4.open(ViewCustomerListComponent, {
      width: '50%',

      data: {
        title: 'Customer Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly dialog5 = inject(MatDialog);

  openDialog5() {
    const dialogRef = this.dialog2.open(EditCustomerListComponent, {
      width: '80%',

      data: {
        title: 'Update Customer Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly dialog6 = inject(MatDialog);
  openDialog6() {
    const dialogRef = this.dialog6.open(AddCustomerComponent, {
      width: 'auto',
      data: {
        title: 'Add New Customer'
      },
    });

  }

}
