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
  userType: any;
  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.userType = userData.user_type
    } else {
      console.error('No user data found in localStorage.');
      this.userType = null; // or set a default value
    }
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
