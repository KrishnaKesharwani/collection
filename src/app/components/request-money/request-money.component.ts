import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ToastrService } from 'ngx-toastr';
import { BackupListService } from 'src/app/services/backupList/backup-list.service';
import { DepositRequestService } from 'src/app/services/depositRequest/deposit-request.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-request-money',
  templateUrl: './request-money.component.html',
  styleUrls: ['./request-money.component.scss']
})
export class RequestMoneyComponent {
  // private isDialogOpen = false;
  // filteredDataarray: any;
  loader: boolean = false;
  company_id: any;
  customer_id: any;
  requestList: any[] = [];
  filterDateForm!: FormGroup;
  date: string = '';
  getCustomerData: any[] = [];
  loading: any;
  selectControl = new FormControl('');
  constructor(public _backupService: BackupListService, public dialog: MatDialog, public _service: DepositRequestService, public _customerService: CustomerService, public _tostr: ToastrService, public fb: FormBuilder,
    public dropdownService: CommonComponentService
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.customer_id = userData.customer_id;
    }
    this.getRequestLoanList();

    this.filterDateForm = this.fb.group({
      date: ['', Validators.required],
      customer_id: ['', Validators.required]
    })

    this.getActiveCustomerList();
  }

  getRequestLoanList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      // loan_status: 'Approved',
      // status: 'Active'
    }
    this._service.getRequestMoney(obj).subscribe((data: any) => {
      this.loader = false;
      console.log(data)
      this.requestList = data.data;
    }, error => {
      this.loader = false;
      this._tostr.error(error.error.message, 'Error');

    })
  }

  getRequestDepsitOnClick() {
    let gatLoanid = this.selectControl.value;
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      customer_id: gatLoanid,
      request_date: this.filterDateForm.value.date
    }

    this._service.getRequestMoney(obj).subscribe((data: any) => {
      this.loader = false;
      console.log(data)
      this.requestList = data.data;
    }, error => {
      this.loader = false;
      this._tostr.error(error.error.message, 'Error');

    })
  }

  getActiveCustomerList() {
    let obj = {
      company_id: this.company_id,
      status: 'active'
    }
    this._customerService.activeCustomer(obj).subscribe((memberData: any) => {
      console.log('customer Data: ', memberData.data);
      this.getCustomerData = memberData.data;

      const members = memberData.data.map((member: any) => member.name);
      this.dropdownService.setOptions('getCustomerData', memberData.data);
    })
  }



  openDialogViewDetail(data?: any): void {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        title: 'Request Details',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // this.isDialogOpen = false;
    });
  }

}
