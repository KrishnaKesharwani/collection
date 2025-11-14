import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import Swal from 'sweetalert2';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { OffersService } from 'src/app/services/offers/offers.service';
import { VcManagementService } from 'src/app/services/vcManagement/vc-management.service';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ReceivedAmountComponent } from './received-amount/received-amount.component';
import { AddVcComponent } from './add-vc/add-vc.component';
import { AddInstalmentComponent } from './add-instalment/add-instalment.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
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
  vcListData: any[] = [];
  selectedStatus = new FormControl('active');

  constructor(public _service: OffersService, public _service_object: VcManagementService, public _customActionService: CustomActionsService, public dialog: MatDialog, private actionService: ActionService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      // this.company_id = '3';
    }
    this.getVcList('all');
  }
  onStatusChange(event: any): void {
    const selectedValue = event.value;
    this.getVcList(selectedValue);
  }
  getVcList(statuscall: any) {
    // debugger;
    this.filteredDataarray = [];
    this.loader = true;
    var obj: any;
    if (statuscall == 'all') {
      obj = {
        company_id: this.company_id,
      }
    } else {
      obj = {
        company_id: this.company_id,
        status: statuscall
      }
    }
    this._service_object.getVcList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.vcListData = response.data;
        this.filteredDataarray = this.vcListData;
        this.loader = false;
      } else {
        this.loader = false;
      }
    }, error => {
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
  openDialogEditDetails(data: any, isNew = false) {
    const dialogRef = this.dialog.open(AddVcComponent, {
      disableClose: true,
      data: {
        title: isNew ? 'Create VC Details' : 'Edit VC Details',
        data: isNew ? {} : data
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getVcList('active');
      }
    });
  }
  receivedAmount(data: any) {
    const dialogRef = this.dialog.open(ReceivedAmountComponent, {
      disableClose: true,
      data: {
        title: 'Received Amount',
        data: data
      },
    });
  }

  instalmentAmount(data: any) {
    const dialogRef = this.dialog.open(AddInstalmentComponent, {
      disableClose: true,
      data: {
        title: 'Instalment Amount',
        data: data
      },
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
  viewDetails(data: any, type: any) {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
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
    this.filteredDataarray = this._customActionService.sortData(column, this.vcListData);
  }
  searchColumns: any[] = ['vc_name', 'type', 'status', 'total_month', 'total_member', 'final_amount', 'start_date', 'end_date','instalment_amount', 'i'];
  searchTerm: string = '';
  searchTable(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.vcListData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.filteredDataarray, this.searchTerm, this.searchColumns);
    }
  }
}
