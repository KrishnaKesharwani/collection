import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.component.html',
  styleUrls: ['./loan-history.component.scss']
})
export class LoanHistoryComponent {

  @Input() title: any;
  company_id: any;
  data: any[] = [];

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public _service: CustomerService
  ) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }

    this.getLoanListData();
  }

  getLoanListData() {
    let obj = {
      company_id: this.company_id
    }

    this._service.loanList(obj).subscribe((data: any) => {
      console.log(data);
      this.data = data.data
    })
  }

}


