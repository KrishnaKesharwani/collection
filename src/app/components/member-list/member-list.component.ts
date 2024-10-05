import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { ViewMemberListComponent } from './view-member-list/view-member-list.component';
import { AssignLoanComponent } from './assign-loan/assign-loan.component';
import { AddMemberComponent } from './add-member/add-member.component';
import Swal from 'sweetalert2';
import { ActionService } from 'src/app/services/action/action.service';

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

  columns = ['Member No.', 'Image', 'Name', 'Mobile', 'Email', 'Aadhar No.', 'Join Date', 'Status'];
  memberData = [
    { MemberNo: 1, image: `<img src="assets/imgs/default-pic.png" />`, Name: 'John Doe', Mobile: '1234567890', Email: 'rk@gmail.com', AadharNo: '1111-2222-3333', JoinDate: '12-12-2000', status: 'Active' },
    // Add more customer objects
  ];

  actions = [


    { action: 'edit_customer', label: 'Edit Customer', icon: 'mdi mdi-pencil mr-2' },
    { action: 'view_details', label: 'View Details', icon: 'mdi mdi-eye mr-2' },

    { action: 'assign_loan', label: 'Assign Loan', icon: 'mdi mdi-account-check-outline mr-2' },

    { action: 'status', label: 'Status', icon: 'mdi mdi-account-off-outline mr-2' },
  ];
  constructor(private actionService: ActionService, public dialog: MatDialog) { }

  ngOnInit() {

  }


  onAction(actionData: { action: string; row: any }) {

    this.actionService.setAction(actionData);
    switch (actionData.action) {

      case 'view_details':
        this.openDialogMemberDetails();
        break;
      case 'edit_customer':
        this.openDialogAdd();
        break;
      case 'assign_loan':
        this.openDialogAssignLoan();
        break;
      case 'status':
        this.openDialogStatus('0ms', '0ms');
        break;
    }
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
