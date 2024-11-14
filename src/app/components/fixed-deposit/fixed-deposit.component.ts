import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { AddFixedDepositComponent } from './add-fixed-deposit/add-fixed-deposit.component';
import { ActionService } from 'src/app/services/action/action.service';
import { FixedDepositService } from 'src/app/services/fixedDeposit/fixed-deposit.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { PaidMoneyComponent } from './paid-money/paid-money.component';
import { ToastrService } from 'ngx-toastr';
import { AmountPaidHistoryComponent } from './amount-paid-history/amount-paid-history.component';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
})
export class FixedDepositComponent {

  deposit_action: any;
  readonly dialog = inject(MatDialog);


  fixedDepositListData: any[] = [];
  loader: boolean = true;
  filteredDataarray: any;
  depositListData: any;
  company_id: any;
  constructor(public _toaster: ToastrService, public _service: FixedDepositService, private actionService: ActionService, public _customActionService: CustomActionsService,) { }


  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.getDepositList();
  }

  getDepositList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      status: 'active'
    }
    this._service.getFixedDeposit(obj).subscribe((data: any) => {
      this.fixedDepositListData = data.data.deposits;
      this.filteredDataarray = this.fixedDepositListData;
      this.loader = false;
    }, error => {
      this._toaster.error(error.massage);
      this.loader = false;
    });
  }

  openDialogAddFixedDeposit() {
    const dialogRef = this.dialog.open(AddFixedDepositComponent, {
      disableClose: true,

      data: {
        title: 'Add New Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDepositList();
      }
    });
  }
  // start edit fixed deposit 

  openDialogEditFixedDeposit(data?: any) {
    const dialogRef = this.dialog.open(AddFixedDepositComponent, {
      disableClose: true,
      data: {
        title: 'Update Fixed Deposit Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDepositList();
      }
    });
  }
  // end edit fixed deposit 
  openDialogPaidhistory(data?: any) {
    const dialogRef = this.dialog.open(AmountPaidHistoryComponent, {
      panelClass: 'medium_popup',
      data: {
        title: 'Amount Paid History',
        data: data,
      },
    });
  }
  // start view details
  openDialogFixedDepositDetails(data?: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      panelClass: 'medium_popup',
      data: {
        title: 'Fixed Deposit Details',
        data: data,
      },
    });
  }
  // end view details

  // start change status
  openDialogStatus(data: any) {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      disableClose: true,
      panelClass: 'delete_popup',
      data: {
        data: data,
        title: 'Update Status',
        field_value: 'Status'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDepositList();
        // this.statusUpdate(data);
      }
    });
  }

  // statusUpdate(data: any) {

  // }

  openDialogPaidMoney(data: any) {
    const dialogRef = this.dialog.open(PaidMoneyComponent, {
      disableClose: true,
      panelClass: 'delete_popup',
      data: {
        title: 'Deposit Paid Money',
        field_value: 'Status',
        data: data,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getDepositList();
      }
    });
  }
  // end change status

  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.fixedDepositListData);
  }

  searchColumns: any[] = ['name', 'start_date', 'end_date', 'deposit_amount', 'refund_amount'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;

    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.fixedDepositListData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }

}


