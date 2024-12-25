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
import { ActionForDepositComponent } from '../admin-dashboard/action-for-deposit/action-for-deposit.component';

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
  user_type: any;
  customerRequestList: any[] = [];
  constructor(public _backupService: BackupListService, public dialog: MatDialog, public _service: DepositRequestService, public _customerService: CustomerService, public _tostr: ToastrService, public fb: FormBuilder,
    public dropdownService: CommonComponentService
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.customer_id = userData.customer_id;
      this.user_type = userData.user_type
    }
    this.filterDateForm = this.fb.group({
      date: [''],
      customer_id: ['']
    })
    if (this.customer_id) {
      this.getRequestDepsitForCustomer();
    } else {
      this.getActiveCustomerList();
      this.getRequestLoanList();
    }
  }

  getRequestLoanList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id,
      // loan_status: 'Approved',
      // status: 'Active'
    }
    this._service.getRequestMoney(obj).subscribe((data: any) => {
      if (data.success) {
        this.requestList = data.data;
      } else {
        this.loader = false;
      }
    }, error => {
      this.loader = false;
      this._tostr.error(error.error.message, 'Error');
    })
  }

  resetTable() {
    this.filterDateForm = this.fb.group({
      date: ['']
    });
    this.selectControl.reset();
    this.getRequestLoanList();
  }
  gatCustomerid: any;
  getRequestClick(event: any, type: any) {
    if (type == 'date') {
      this.selectControl.reset();
    } else {
      this.gatCustomerid = event;
      this.filterDateForm = this.fb.group({
        date: ['']
      });
    }
    this.getRequestDepsitOnClick();
  }
  formattedDate: string = '';
  getRequestDepsitOnClick() {
    this.loader = true;
    // let gatCustomerid = this.selectControl.value;
    this.formattedDate = new Date(this.filterDateForm.value.date).toString();
    if (this.formattedDate == 'Invalid Date') {
      this.formattedDate = '';
    }
    let obj = {
      company_id: this.company_id,
      customer_id: this.gatCustomerid,
      request_date: this.formattedDate
    }
    this._service.getRequestMoney(obj).subscribe((data: any) => {
      if (data.success) {
        this.requestList = data.data;
        this.loader = false;
      } else {
        this.loader = false;
      }
    }, error => {
      this.loader = false;
      this._tostr.error(error.error.message, 'Error');
    })
  }

  getRequestDepsitForCustomer() {
    this.loader = true;
    // let gatCustomerid = this.selectControl.value;
    let obj = {
      company_id: this.company_id,
      customer_id: this.customer_id,
      // request_date: this.filterDateForm.value.date
    }
    this._service.getRequestMoneyForCustomer(obj).subscribe((data: any) => {
      if (data.success) {
        this.customerRequestList = data.data;
      } else {
        this.loader = false;
      }
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
      this.getCustomerData = memberData.data;
      const members = memberData.data.map((member: any) => member.name);
      this.dropdownService.setOptions('getCustomerData', memberData.data);
    }, error => {
      this._tostr.error(error.message, 'Error');
    })
  }

  openDialogViewDetail(data: any): void {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      data: {
        title: 'Request Details',
        data: data
      },
    });
  }

  openDialogActionForDeposit(data?: any) {
    const dialogRef = this.dialog.open(ActionForDepositComponent, {
      panelClass: 'medium_popup',
      disableClose: true,
      data: {
        title: 'Message For Deposit',
        data: data
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRequestDepsitOnClick();
      }
    });
  }

}
