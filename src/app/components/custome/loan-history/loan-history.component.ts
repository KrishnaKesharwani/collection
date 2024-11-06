import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
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
  loader = false;
  constructor(public _tostr: ToastrService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public _service: CustomerService
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
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      // loan_status: 'paid',
      // status: 'active',
      customer_id: this.dataa.data.id
    }

    this._service.loanList(obj).subscribe((data: any) => {
      console.log('Customer Loan List',data.data.loans);
      this.data = data.data.loans;
      this.loader = false;
    }, error => {
      this.loader = false;
      this._tostr.error(error.message, 'Error');
    });
  }

}


