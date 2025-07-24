import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import Swal from 'sweetalert2';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ReceivedAmountComponent } from './received-amount/received-amount.component';
import { AddVcComponent } from './add-vc/add-vc.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vc-management',
  templateUrl: './vc-management.component.html',
  styleUrls: ['./vc-management.component.scss']
})
export class VcManagementComponent {

  offer_modalaction: any;
  usertype: any;
  company_id: any;
  // customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;
  offerListData: any[] = [];
  selectedStatus = new FormControl('active');
  
  constructor(public _service: OffersService, public _customActionService: CustomActionsService, public dialog: MatDialog, private actionService: ActionService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.getVcList('active');
  }
  onStatusChange(event: any): void {
    const selectedValue = event.value;
    this.getVcList(selectedValue);
  }
  getVcList(statuscall: any) {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      status: statuscall
    }
    this._service.getOfferList(obj).subscribe((data: any) => {
      this.offerListData = data.data;
      this.filteredDataarray = this.offerListData;
      this.loader = false;
    })
  }

  openDialogChangeMember(data: any) {
    const dialogRef = this.dialog.open(ChangeMemberComponent, {
      disableClose: true,
      data: {
        title: 'Change VC Member',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
          this.getVcList('active');
      }
    });
  }

  openDialogReceivedAmount(data: any) {
    const dialogRef = this.dialog.open(ReceivedAmountComponent, {
      disableClose: true,
      data: {
        title: 'VC Received Amount',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getVcList('active');
      }
    });
  }
  openDialogEditDetails(data: any) {
    const dialogRef = this.dialog.open(AddVcComponent, {
      disableClose: true,
      data: {
        title: 'Edit VC Details',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
       this.getVcList('active');
      }
    });
  }

  openDialogViewDetail(data: any) {
    const dialogRef = this.dialog.open(AddVcComponent, {
      disableClose: true,
      data: {
        title: 'View Details',
        data: data
      },
    });
  }

  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.offerListData);
  }

  searchColumns: any[] = ['name', 'type', 'status', 'i'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.offerListData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }
}
