import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MassageForApplierComponent } from './massage-for-applier/massage-for-applier.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  animal!: string;
  name!: string;
  constructor(public dialog: MatDialog) { }
  ngOnInit() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MassageForApplierComponent, {
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  submitMessage() {

  }
}
