import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-provider-loan',
  templateUrl: './provider-loan.component.html',
  styleUrls: ['./provider-loan.component.scss']
})
export class ProviderLoanComponent {
  deleteAction: any;
  providerLoanForm!: FormGroup;
  loading = false;
  customername: string = ""
  loanamount: string = "";
  instalmentamount: string = "";
  noofdays: string = "";
  startdate: string = "";
  enddate: string = "";
  loandetails: string = "";
  company_id: any;
  startDate: string = '';
  endDate: string = '';
  noOfDays: number | null = null;
  installment_amount: string = '';
  details: string = '';
  no_of_days: string = '';
  loan_amount: string = '';
  end_date: string = '';
  start_date: string = '';


  constructor(public _tostr: ToastrService, public _service: CustomerService, private dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }

    this.providerLoanForm = this.fb.group({
      customername: [this.dataa.data.name],
      loan_amount: ['', Validators.required],
      installment_amount: ['', Validators.required],
      assigned_member_id: [''],
      no_of_days: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      details: [''],
      loan_status: [''],
      status: ['']
    });
    // this.startDate = this.providerLoanForm.value.startDate
    // this.endDate = this.providerLoanForm.value.endDate

    this.getActiveMmberList();
    // this.calculateDays();
    // this.dropdownService.setOptions('assingmember', ['Bhaijan', 'Roshan Kanojiya']);
    this.dropdownService.setOptions('loanstatus', ['Active', 'Inactive']);
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  getActiveMmberList() {
    let obj = {
      company_id: this.company_id,
      status: 'active'
    }
    this._service.activeMembers(obj).subscribe((memberData: any) => {
      const members = memberData.data.map((member: any) => member.name);
      this.dropdownService.setOptions('assingmember', members);
    })
  }

  submit() {
    console.log(this.providerLoanForm.value)
    debugger
    if (this.providerLoanForm.valid) {
      this.loading = true
      let obj = {
        company_id: this.company_id,
        customer_id: this.dataa.data.id,
        ...this.providerLoanForm.value
      }
      this._service.provideLoan(obj).subscribe((data: any) => {
        console.log(data)
        this.providerLoanForm.reset();
        this._tostr.success(data.message, 'Success');

        debugger
      })
      // this.dialog.closeAll();
    } else {
      this.providerLoanForm.markAllAsTouched()
    }
  }


}
