import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceMoneyComponent } from './advance-money/advance-money.component';
import { VpdateStatusComponent } from './vpdate-status/vpdate-status.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';

@Component({
  selector: 'app-money-received',
  templateUrl: './money-received.component.html',
  styleUrls: ['./money-received.component.scss']
})
export class MoneyReceivedComponent {


  actions = [

    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'change_status', label: 'Change Status', icon: 'mdi mdi-plus-circle-outline mr-2' },


    { action: 'advance_money', label: 'Advance Money', icon: 'mdi mdi-plus-circle-outline mr-2' },


  ];
  company_id: any;
  customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;
  constructor(public _customActionService: CustomActionsService, private actionService: ActionService) { }

  ngOnInit() {

  }


  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {
      case 'change_status':
        this.openDialogChangeStatus('1ms', '5ms', actionData.row);
        break;
      case 'view_details':
        this.openDialogViewDetail(actionData.row);
        break;

      case 'advance_money':
        this.openDialogAdvanceMoney(actionData.row);
        break;

    }

  }


  readonly dialog = inject(MatDialog);

  openDialogViewDetail(data: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      disableClose: false,
      data: {
        title: 'Money Collection Details',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogChangeStatus(enterAnimationDuration: string, exitAnimationDuration: string, data: any) {
    const dialogRef = this.dialog.open(VpdateStatusComponent, {
      disableClose: true,
      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Received Money Status',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogAdvanceMoney(data: any) {
    const dialogRef = this.dialog.open(AdvanceMoneyComponent, {
      disableClose: true,
      data: {
        title: 'Add Advance Money',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.customerData);
  }

  searchColumns: any[] = ['name', 'status', 'mobile'];
  searchTerm: string = '';
  searchTable(event: Event) {
    debugger
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.customerData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }
}
