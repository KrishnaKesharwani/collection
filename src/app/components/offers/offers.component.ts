import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import Swal from 'sweetalert2';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  offer_modalaction: any;
  usertype: any;


  columns = ['Offer Name', 'Image', 'Type', 'Details', 'Status'];
  offerData = [
    {},
    // Add more customer objects
  ];

  actions = [


    { action: 'edit_deposit', label: 'Change Member', icon: 'mdi mdi-pencil mr-2' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },
    { action: 'change_status', label: 'Change Status', icon: 'mdi mdi-account-off-outline mr-2' },
    { action: 'set_default', label: 'Set Default', icon: 'mdi mdi-checkbox-marked-circle-outline mr-2' },
  ];

  constructor(public dialog: MatDialog, private actionService: ActionService) { }


  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {


      case 'edit_deposit':
        this.openDialog2();
        break;
      case 'view_details':
        this.openDialog4();
        break;
      case 'change_status':
        this.openDialog('1ms', '5ms');
        break;
      case 'change_status':
        this.openDialog5('1ms', '5ms');
        break;
    }
  }
  ngOnInit() {

  }


  readonly dialog2 = inject(MatDialog);
  openDialog2() {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      disableClose: true,
      data: {
        title: 'Add New Offers / Schems',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
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

  readonly dialog3 = inject(MatDialog);
  openDialog3() {
    const dialogRef = this.dialog3.open(AddOfferComponent, {
      disableClose: true,
      data: {
        title: 'Update New Offers / Schems',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


  readonly dialog4 = inject(MatDialog);
  openDialog4() {
    const dialogRef = this.dialog4.open(ViewOfferComponent, {
      data: {
        title: 'Offers / Schems Details',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


  readonly dialog5 = inject(MatDialog);
  openDialog5(enterAnimationDuration: string, exitAnimationDuration: string) {

    const dialogRef = this.dialog5.open(DeleteComponent, {

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
}
