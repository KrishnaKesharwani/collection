import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

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

  openDialogAdd() { }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
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
    alert('delete api');
  }
}
