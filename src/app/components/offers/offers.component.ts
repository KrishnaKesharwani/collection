import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import Swal from 'sweetalert2';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { OffersService } from 'src/app/services/offers/offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  offer_modalaction: any;
  usertype: any;
  company_id: any;
  customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;
  offerListData: any[] = [];


  constructor(public _service: OffersService, public _customActionService: CustomActionsService, public dialog: MatDialog, private actionService: ActionService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }

    this.getOfferList();
  }


  openDialogAddOffers() {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      disableClose: true,
      data: {
        title: 'Add New Offers / Schems',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialogChangeStatus(enterAnimationDuration: string, exitAnimationDuration: string, data: any): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {

      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {

        title: 'Inactive This Offers/Schems?',
        subTitle: 'You wont be inactive Offers/Scheme!',
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete();
    });
  }
  delete(e?: any) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: 'Success',
      text: "Offers / Scheme status updated successfully...",
      showConfirmButton: true,
      timer: 1500
    });
  }

  openDialog3() {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      disableClose: true,
      data: {
        title: 'Update New Offers / Schems',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


  openDialogViewDetail(data: any) {
    const dialogRef = this.dialog.open(ViewOfferComponent, {
      data: {
        title: 'Offers / Schems Details',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


  openDialogSetDefault(enterAnimationDuration: string, exitAnimationDuration: string, data: any) {

    const dialogRef = this.dialog.open(DeleteComponent, {

      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {

        title: 'Are you sure?',
        subTitle: 'You wont be show this Offers / Scheme in default login!',
      },
    });

    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.deleteActions();
    });
  }
  deleteActions() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: 'Success',
      text: "Offers / Scheme default set successfully...",
      showConfirmButton: true,
      timer: 1500
    });
  }

  openDialogChangeMember() {

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

  getOfferList() {
    let obj = {
      company_id: this.company_id
    }
    this._service.getOfferList(obj).subscribe((data: any) => {
      console.log(data.data);
      this.offerListData = data.data;
    })
  }
}
