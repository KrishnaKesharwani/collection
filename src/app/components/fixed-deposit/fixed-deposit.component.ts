import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { AddFixedDepositComponent } from './add-fixed-deposit/add-fixed-deposit.component';
import { ActionService } from 'src/app/services/action/action.service';
import { FixedDepositService } from 'src/app/services/fixedDeposit/fixed-deposit.service';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.component.html',
  styleUrls: ['./fixed-deposit.component.scss']
})
export class FixedDepositComponent {

  deposit_action: any;
  readonly dialog = inject(MatDialog);


  columns = [
    // { prop: 'company_name', name: 'Member No.', orderable: true },
    { prop: 'name', name: 'Fixed Deposit Name', orderable: true },
    { prop: 'image', name: 'Customer Name', orderable: false, isImage: true },
    { prop: 'mobile', name: 'Start Date', orderable: false },
    { prop: 'email', name: 'End Date', orderable: false },
    { prop: 'email', name: 'Days / Time Slot', orderable: false },

    { prop: 'aadhar_no', name: 'Start Amount', orderable: false },
    { prop: 'join_date', name: 'End Amount', orderable: false },
    { prop: 'status', name: 'Status', orderable: false }
  ];
  actions = [
    { action: 'edit_deposit', label: 'Change Member', icon: 'mdi mdi-pencil mr-2' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'change_status', label: 'Change Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];
  fixedDepositListData: any[] = [];
  loader: any;
  filteredDataarray: any;
  depositListData: any;
  constructor(private actionService: ActionService, public _depositService: FixedDepositService) { }


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

  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {
      case 'edit_deposit':
        this.openDialogEditFixedDeposit();
        break;
      case 'view_details':
        this.openDialogFixedDepositDetails();
        break;
      case 'change_status':
        this.openDialogStatus('1ms', '5ms');
        break;
    }
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

    this.filteredDataarray = this._depositService.sortData(column, this.fixedDepositListData);


  }


  searchColumns: any[] = ['company_name', 'owner_name', 'advance_amount', 'status', 'mobile'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;

    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.depositListData;
    } else {
      this.filteredDataarray = this._depositService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }

  }
}


