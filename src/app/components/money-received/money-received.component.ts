import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdvanceMoneyComponent } from './advance-money/advance-money.component';
import { VpdateStatusComponent } from './vpdate-status/vpdate-status.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoneyReceivedService } from 'src/app/services/moneyReceived/money-received.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(public toaster: ToastrService, public _service: MoneyReceivedService, public _customActionService: CustomActionsService, private actionService: ActionService, public fb: FormBuilder) { }

  ngOnInit() {
    const data: any = localStorage.getItem('CurrentUser');
    const userData = JSON.parse(data);
    this.company_id = userData.company_id;
    this.filterDateForm = this.fb.group({
      date: ['']
    });
    this.getCollectionList();
  }

  resetTable() {
    this.filterDateForm = this.fb.group({
      date: ['']
    });
    let searchBox: any = document.getElementById('search_textbox');
    searchBox.value = '';
    this.getCollectionList();
  }
  formattedDate: string | null = null;
  getCollectionList() {
    this.loader = true;
    this.formattedDate = new Date(this.filterDateForm.value.date).toString(); 
    if (this.formattedDate == 'Invalid Date') {
      this.formattedDate = '';
    }
    let obj = {
      company_id: this.company_id,
      date: this.formattedDate,
      // date: 'Wed Dec 4 2024 00:00:00 GMT+0530 (India Standard Time)'
    }
    this._service.getCollection(obj).subscribe((data: any) => {
      this.collectionData = data.data;
      this.filteredDataarray = this.collectionData;
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toaster.error(error.error.message, 'Error');
    });
  }

  readonly dialog = inject(MatDialog);
  openDialogViewDetail(data: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      disableClose: true,
      panelClass: 'medium_popup',
      data: {
        data: data,
        id: data.id,
        title: 'Money Collection Details',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCollectionList();
      }
    });
  }

  openDialogChangeStatus(data: any) {
    const dialogRef = this.dialog.open(VpdateStatusComponent, {
      disableClose: true,
      data: {
        id: data.id,
        title: 'Received Money Status',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCollectionList();
      }
    });
  }

  openDialogAdvanceMoney(data: any) {
    const dialogRef = this.dialog.open(AdvanceMoneyComponent, {
      disableClose: true,
      data: {
        id: data.id,
        title: 'Add Advance Money',
        data: data,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getCollectionList();
      }
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
  searchColumns: any[] = ['name', 'customer_count', 'payment_status', 'remaining_amount'];
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
}
