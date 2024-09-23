import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { DialogData } from '../admin-dashboard.component';

@Component({
  selector: 'app-massage-for-applier',
  templateUrl: './massage-for-applier.component.html',
  styleUrls: ['./massage-for-applier.component.scss']
})
export class MassageForApplierComponent {
  constructor(
    public dialogRef: MatDialogRef<MassageForApplierComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
