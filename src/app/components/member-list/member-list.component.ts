import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { ViewMemberListComponent } from './view-member-list/view-member-list.component';
import { AssignLoanComponent } from './assign-loan/assign-loan.component';
import { AddMemberComponent } from './add-member/add-member.component';
import Swal from 'sweetalert2';

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

  openDialogStatus(enterAnimationDuration: string, exitAnimationDuration: string): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {

      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Update Member Status?',
        subTitle: 'You wont to be update member status!',
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
      text: "Member status updated successfully...",
      showConfirmButton: true,
      timer: 1500
    });
  }
  readonly dialog5 = inject(MatDialog);

  openDialogAdd() {
    const dialogRef = this.dialog5.open(AddMemberComponent, {
      disableClose: true,
      panelClass: 'update_dialoge',
      data: {
        title: 'Add New Member',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog2 = inject(MatDialog);

  openDialogUpdateDetails() {
    const dialogRef = this.dialog2.open(AddMemberComponent, {
      disableClose: true,
      panelClass: 'update_dialoge',
      data: {
        title: 'Update Member',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog3 = inject(MatDialog);

  openDialogMemberDetails() {
    const dialogRef = this.dialog3.open(ViewMemberListComponent, {
      panelClass: 'view_details_small_popup',
      data: {
        title: 'Member Details',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog4 = inject(MatDialog);

  openDialogAssignLoan() {
    const dialogRef = this.dialog4.open(AssignLoanComponent, {
      disableClose: true,
      panelClass: 'view_details_popup',
      data: {
        title: 'Assign Loan History Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
