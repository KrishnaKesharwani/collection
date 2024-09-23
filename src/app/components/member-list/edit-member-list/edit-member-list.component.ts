import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-member-list',
  templateUrl: './edit-member-list.component.html',
  styleUrls: ['./edit-member-list.component.scss']
})
export class EditMemberListComponent {
  @Input() title: any;
  @Input() subTitle: any;
  @Input() data: any;
  @Input() modal: any;

  @Output() deleteAction = new EventEmitter();

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //   this.dialog.open(EditMemberListComponent, {
  //     // width: '250px',
  //     enterAnimationDuration,
  //     exitAnimationDuration,
  //   });
  // }
  // delete() {
  //   this.deleteAction.emit(this.data);

  // }
  onNoClick() {
    this.dialog.closeAll();
  }
}
