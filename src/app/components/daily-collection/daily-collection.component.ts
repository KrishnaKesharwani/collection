import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CollectionHistoryComponent } from './collection-history/collection-history.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { ViewDetailsComponent } from './view-details/view-details.component';

@Component({
  selector: 'app-daily-collection',
  templateUrl: './daily-collection.component.html',
  styleUrls: ['./daily-collection.component.scss']
})
export class DailyCollectionComponent {
  loanassign_action = 0;
  constructor(public dropdownService: CommonComponentService) { }

  ngOnInit(): void {
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  loanAssignMember(action: number) {
    this.loanassign_action = action;
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CollectionHistoryComponent, {

      disableClose: true,
      data: {
        title: 'Collection History',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog2 = inject(MatDialog);

  openDialog2() {
    const dialogRef = this.dialog2.open(AssignMemberComponent, {
      disableClose: true,
      data: {
        title: 'Assign Collection Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog3 = inject(MatDialog);

  openDialog3() {
    const dialogRef = this.dialog3.open(ChangeMemberComponent, {
      disableClose: true,
      data: {
        title: 'Update Collection Member',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog4 = inject(MatDialog);

  openDialog4() {
    const dialogRef = this.dialog4.open(ViewDetailsComponent, {

      data: {
        title: 'Member Details',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  readonly dialog5 = inject(MatDialog);

  openDialog5() {
    const dialogRef = this.dialog5.open(ChangeStatusComponent, {
      disableClose: true,
      data: {
        title: 'Change Member Status',

      },
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
