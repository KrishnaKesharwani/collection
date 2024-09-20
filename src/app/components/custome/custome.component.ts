import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

@Component({
  selector: 'app-custome',
  templateUrl: './custome.component.html',
  styleUrls: ['./custome.component.scss']
})
export class CustomeComponent {

  usertype: any;
  customer_action: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  statusActive() {

  }

  addMember(number: any) {

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
      data: {
        title: 'Delete This Record?',
        subTitle: 'You wont be inactive customer status!',
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
