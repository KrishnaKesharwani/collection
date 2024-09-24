import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-fixed-deposit',
  templateUrl: './edit-fixed-deposit.component.html',
  styleUrls: ['./edit-fixed-deposit.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFixedDepositComponent {

  @Input() title: any;
  @Output() deleteAction = new EventEmitter();

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string },
  ) { }

  onNoClick() {
    this.dialog.closeAll();
  }
}


