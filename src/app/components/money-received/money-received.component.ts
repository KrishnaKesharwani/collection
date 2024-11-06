import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceMoneyComponent } from './advance-money/advance-money.component';
import { VpdateStatusComponent } from './vpdate-status/vpdate-status.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-money-received',
  templateUrl: './money-received.component.html',
  styleUrls: ['./money-received.component.scss']
})
export class MoneyReceivedComponent {

  company_id: any;
  customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;
  filter_date!: string | Date | null;
  filterDateForm!: FormGroup;
  constructor(public _customActionService: CustomActionsService, private actionService: ActionService, public fb: FormBuilder) { }

  ngOnInit() {
    this.filterDateForm = this.fb.group({
      filter_date: ['']
    })
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

  openDialogChangeStatus(data: any) {
    const dialogRef = this.dialog.open(VpdateStatusComponent, {
      disableClose: true,
      panelClass: 'delete_popup',
      data: {
        title: 'Received Money Status',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
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

    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.customerData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }
}
