import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-customer-list',
  templateUrl: './view-customer-list.component.html',
  styleUrls: ['./view-customer-list.component.scss']
})

export class ViewCustomerListComponent {
  company_id: any;
  data: any;
  customerDetails: any = [];

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    this.viewCompanyDetail();
  }

  viewCompanyDetail() {
    this.data = this.dataa.data;
  }
}
