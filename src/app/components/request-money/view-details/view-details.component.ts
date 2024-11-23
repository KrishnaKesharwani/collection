import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent {
  data: any;
  company_id: any;
  customer_id: any;
  user_type: any;

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.customer_id = userData.customer_id;
      this.user_type = userData.user_type

    }
    this.viewwDepositRequestDetails();
  }

  viewwDepositRequestDetails() {
    this.data = this.dataa.data;
  }
}
