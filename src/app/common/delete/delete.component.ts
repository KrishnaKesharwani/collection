import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonComponentsModule } from '../common-components.module';

@Component({
  selector: 'app-delete',
  standalone: true,
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  imports: [CommonComponentsModule, DeleteComponent]
})

export class DeleteComponent {

  @Input() title: any;
  @Input() subTitle: any;
  @Input() data: any;
  @Input() modal: any;

  @Output() deleteAction = new EventEmitter();

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string }) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }


  delete() {
    this.deleteAction.emit(this.data);

  }
}
