import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { ViewMemberListComponent } from './view-member-list/view-member-list.component';
import { AssignLoanComponent } from './assign-loan/assign-loan.component';
import { AddMemberComponent } from './add-member/add-member.component';
import Swal from 'sweetalert2';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { MemberService } from 'src/app/services/member/member.service';

@Component({

  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent {

  member_action: any;
  member_details: any;
  show_list: any;
  loader = false;
  dataForDelete: any = {};
  readonly dialog = inject(MatDialog);

  filteredDataarray: any[] = [];
  memberListData: any[] = [];
  company_id: any;
  constructor(public _service: MemberService, public _customActionService: CustomActionsService, private actionService: ActionService) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;

    }
    this.getMemberList();
  }


  getMemberList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id
    }
    this._service.getList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.memberListData = response.data;
        this.filteredDataarray = this.memberListData;
        this.loader = false;
      }
    })
    this.loader = false;
  }


  openDialogStatus(enterAnimationDuration: string, exitAnimationDuration: string, data?: any): void {
    // this.dataForDelete = enterAnimationDuration
    const dialogRef = this.dialog.open(DeleteComponent, {

      panelClass: 'delete_popup',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Are you sure?',
        subTitle: data && data.status === 'active'
          ? 'You want to inactivate member status!'
          : 'You want to activate member status!'
      }
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.delete(data);
    });
  }

  delete(data: any) {
    let obj = {
      member_id: data.id,
      status: data.status == 'active' ? 'inactive' : 'active'
    }

    this._service.changeStatus(obj).subscribe((data: any) => {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Success',
          text: 'Member Status Updated!',
          showConfirmButton: true,
          timer: 1500
        });
      }

    });
    this.getMemberList();
  }


  openDialogEditMember(data: any) {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      disableClose: true,
      panelClass: 'update_dialoge',
      data: {
        title: 'Update Member',
        data: data
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogAddMember() {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      disableClose: true,
      panelClass: 'update_dialoge',
      data: {
        title: 'Add New Member'
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }



  openDialogUpdateDetails() {
    const dialogRef = this.dialog.open(AddMemberComponent, {
      disableClose: true,
      panelClass: 'update_dialoge',
      data: {
        title: 'Update Member',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  openDialogMemberDetails(data: any) {
    const dialogRef = this.dialog.open(ViewMemberListComponent, {
      panelClass: 'view_details_small_popup',
      data: {
        data: data,
        title: 'Member Details',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }



  openDialogAssignLoan(data: any) {
    const dialogRef = this.dialog.open(AssignLoanComponent, {
      disableClose: true,
      panelClass: 'view_details_popup',
      data: {
        data: data,
        title: 'Assign Loan History Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  isAsc: boolean = true;
  sortTableData(column: string) {
    if (this.isAsc) {
      this.isAsc = false;
    } else {
      this.isAsc = true;
    }
    this.filteredDataarray = this._customActionService.sortData(column, this.memberListData);
  }


  searchColumns: any[] = ['name', 'status', 'mobile'];
  searchTerm: string = '';
  searchTable(event: Event) {

    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;

    if (this.searchTerm == null || this.searchTerm == '') {
      this.filteredDataarray = this.memberListData;
    } else {
      this.filteredDataarray = this._customActionService.filteredData(this.memberListData, this.searchTerm, this.searchColumns);
    }

  }
}
