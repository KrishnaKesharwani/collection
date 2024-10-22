import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss']
})
export class ApplyLoanComponent {
  applyLoanForm!: FormGroup;
  loading = false;
  customername: string = "";
  loanamount: any;
  loandetails: string = '';
  deleteAction: any;
  detail: string = '';
  loan_amount: string = '';
  customer_id: any;
  company_id: any;
  userType: any;
  customer_name: any;
  constructor(public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public _toastr: ToastrService, public _router: Router, public _service: CustomerService
  ) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.customer_id = userData.customer_id;
      this.customer_name = userData.name;
      this.userType = userData.user_type;
    }
    if (this.userType == 2) {
      this.customer_name = this.dataa.data.name;
    } else {
      this.customer_name = this.customer_name;
    }
    // this.customer_name = this.customer_name == null ? this.dataa.data.name : this.customer_name;
    this.applyLoanForm = this.fb.group({
      customername: this.customer_name,
      loan_amount: ['', Validators.required],
      detail: ['', Validators.required]
    });
    this.customer_id = this.customer_id;
    this.company_id = this.company_id;
  }

  save() {
    if (this.applyLoanForm.valid) {
      this.loading = true;
      let obj = {
        company_id: this.company_id,
        customer_id: this.customer_id == null ? this.dataa.data.id : this.customer_id,
        detail: this.applyLoanForm.value.detail,
        loan_amount: this.applyLoanForm.value.loan_amount
      }
      this._service.applyLoan(obj).subscribe((data: any) => {
        this._toastr.success(data.message, "Success");
        this.applyLoanForm.reset();
        this.loading = false;
        this.dialog.closeAll();
      })
    }
  }
}
