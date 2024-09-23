import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { EditMemberListComponent } from './edit-member-list/edit-member-list.component';
import { ViewMemberListComponent } from './view-member-list/view-member-list.component';
import { AssignLoanComponent } from './assign-loan/assign-loan.component';

@Component({

  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent {

  member_action: any;
  member_details: any;
  show_list: any;
  me: any;
  dataForDelete: any = {};
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }
  statusActive() {

  }

  viewDetails() {

  }

  editDetails(number: any) {

  }

  addMember(number: any) {

  }



  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Delete This Record?',
        subTitle: 'You wont be inactive member status!',
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete();
    });
  }

  delete(e?: any) {
    alert('delete api');
  }

  readonly dialog2 = inject(MatDialog);

  openDialog2() {
    const dialogRef = this.dialog2.open(EditMemberListComponent, {
      width: '80%',

      data: {
        title: 'Update Members Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly dialog3 = inject(MatDialog);

  openDialog3() {
    const dialogRef = this.dialog3.open(ViewMemberListComponent, {
      width: '50%',

      data: {
        title: 'Member Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  readonly dialog4 = inject(MatDialog);

  openDialog4() {
    const dialogRef = this.dialog4.open(AssignLoanComponent, {
      width: '80%',

      data: {
        title: 'Assign Loan History Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
