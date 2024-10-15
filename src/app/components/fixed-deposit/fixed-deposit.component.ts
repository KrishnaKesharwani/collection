import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { AddFixedDepositComponent } from './add-fixed-deposit/add-fixed-deposit.component';
import { ActionService } from 'src/app/services/action/action.service';
import { FixedDepositService } from 'src/app/services/fixedDeposit/fixed-deposit.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
})
export class FixedDepositComponent {

  deposit_action: any;
  readonly dialog = inject(MatDialog);


  fixedDepositListData: any[] = [];
  loader: any;
  filteredDataarray: any;
  depositListData: any;
  constructor(private actionService: ActionService, public _customActionService: CustomActionsService,) { }


  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      // this.company_id = userData.company_id;

    }
    this.getDepositList();
  }


  getDepositList() {
    this.fixedDepositListData = []
  }


  openDialogAddFixedDeposit() {
    const dialogRef = this.dialog.open(AddFixedDepositComponent, {
      disableClose: true,

      data: {
        title: 'Add New Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  // start edit fixed deposit 

  openDialogEditFixedDeposit() {
    const dialogRef = this.dialog.open(AddFixedDepositComponent, {
      disableClose: true,

      data: {
        title: 'Update Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  // end edit fixed deposit 

  // start view details
  openDialogFixedDepositDetails() {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {


      data: {
        title: 'Fixed Deposit Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
  // end view details

  // start change status
  openDialogStatus(enterAnimationDuration: string, exitAnimationDuration: string, data?: any) {
    const dialogRef = this.dialog.open(ChangeStatusComponent, {
      disableClose: true,
      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Update Status',
        field_value: 'Status'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
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


  searchColumns: any[] = ['company_name', 'owner_name', 'advance_amount', 'status', 'mobile'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;

    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.depositListData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }

  }
}


