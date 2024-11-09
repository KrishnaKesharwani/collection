import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceMoneyComponent } from './advance-money/advance-money.component';
import { VpdateStatusComponent } from './vpdate-status/vpdate-status.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoneyReceivedService } from 'src/app/services/moneyReceived/money-received.service';

@Component({
  selector: 'app-money-received',
  templateUrl: './money-received.component.html',
  styleUrls: ['./money-received.component.scss']
})
export class MoneyReceivedComponent {

  company_id: any;
  collectionData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;
  filter_date!: string | Date | null;
  filterDateForm!: FormGroup;
  date: any;
  // collectionData: any[] = [];
  constructor(public _service: MoneyReceivedService, public _customActionService: CustomActionsService, private actionService: ActionService, public fb: FormBuilder) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;

    }

    this.filterDateForm = this.fb.group({
      date: ['']
    })

    this.getCollectionList();
  }



  readonly dialog = inject(MatDialog);

  openDialogViewDetail(data: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      disableClose: false,
      data: {
        data: data,
        id: data.id,
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
        id: data.id,
        title: 'Received Money Status',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  openDialogAdvanceMoney(data: any) {
    const dialogRef = this.dialog.open(AdvanceMoneyComponent, {
      disableClose: true,
      data: {
        id: data.id,
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
    this.filteredDataarray = this._customActionService.sortData(column, this.collectionData);
  }

  searchColumns: any[] = ['name', 'status', 'mobile'];
  searchTerm: string = '';
  searchTable(event: Event) {

    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.collectionData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }

  getCollectionList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      date: this.filterDateForm.value.date
    }

    this._service.getCollection(obj).subscribe((data: any) => {
      console.log(data.data);
      this.collectionData = data.data;
      this.loader = false;
    })
  }
}
