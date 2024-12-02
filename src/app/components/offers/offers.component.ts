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
  // customerData: any[] = [];
  filteredDataarray: any[] = [];
  loader = false;
  offerListData: any[] = [];

  constructor(public _service: OffersService, public _customActionService: CustomActionsService, public dialog: MatDialog, private actionService: ActionService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.usertype = userData.user_type;
    }

    this.getOfferList();
  }

  getOfferList() {
    this.offerListData = [];
    this.filteredDataarray = [];
    this.loader = true;
    let obj = {
      company_id: this.company_id
    }
    this._service.getOfferList(obj).subscribe((data: any) => {
      this.offerListData = data.data;
      this.filteredDataarray = this.offerListData;
      this.loader = false;
    }, error => {
      this.loader = false;
    })
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
        id: data.id,
        title: 'Are you sure?',
        subTitle: data && data.status === 'active'
          ? 'You want to Inactivate Offer Status!'
          : 'You want to Activate Offer Status!'
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.statusAction(data);
    });
  }

  statusAction(e?: any) {
    let obj = {
      offer_id: e?.id,
      status: e?.status == 'active' ? 'inactive' : 'active'
    }
    this._service.changeStatus(obj).subscribe((data: any) => {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Success',
          text: "Offers / Scheme status updated successfully...",
          showConfirmButton: true,
          timer: 1500
        });
      }
      this.getOfferList();
    });
  }

  openDialogAddOffer() {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      disableClose: true,
      panelClass: 'medium_popup',
      data: {
        title: 'Add New Offers / Schems',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getOfferList();
      }
    });
  }

  openDialogEditOffer(data: any) {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      disableClose: true,
      panelClass: 'medium_popup',
      data: {
        title: 'Update Offers / Schems',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getOfferList();
      }
    });
  }

  openDialogDelete(data: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete_popup',
      data: {
        title: 'Are you sure?',
        subTitle: 'You wont be delete this Offers / Scheme!',
      },
    });

    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.deleteOffer(data);
    });
  }

  deleteOffer(data: any) {
    // let obj = {
    //   offer_id: data?.id,
    // }
    let offerid = data?.id;
    this._service.deleteOffer(offerid).subscribe((data: any) => {
      if (data) {
        this.getOfferList();
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Success',
          text: "Offers / Scheme deleted successfully...",
          showConfirmButton: true,
          timer: 1500
        });
      }
    });
  }

  openDialogViewDetail(data: any) {
    const dialogRef = this.dialog.open(ViewOfferComponent, {
      panelClass: 'view_details_small_popup',
      data: {
        data: data,
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
      this.setDefaultActions(data);
    });
  }

  setDefaultActions(data: any) {
    let obj = {
      offer_id: data?.id,
      default_offer: data?.default_offer == 'true' ? 'false' : 'true'
    }
    this._service.defaultOffer(obj).subscribe((data: any) => {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Success',
          text: "Offers / Scheme default set successfully...",
          showConfirmButton: true,
          timer: 1500
        });
      }
      this.getOfferList();
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
