import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
  offer_modalaction: any;
  usertype: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }
  offerModal(index: any) {

  }

  statusActive() {

  }

  setDefault() {

  }

  readonly dialog2 = inject(MatDialog);
  openDialog2() {
    const dialogRef = this.dialog.open(AddOfferComponent, {
      data: {
        title: 'Add New Offers / Schems',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {

        title: 'Delete This Record?',
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
    const dialogRef = this.dialog3.open(EditOfferComponent, {
      data: {
        title: 'Update New Offers / Schems',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
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
      console.log(`Dialog result: ${result}`);
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
