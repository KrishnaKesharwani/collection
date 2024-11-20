import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaidDataEntryService } from 'src/app/services/paidDataEntry/paid-data-entry.service';
import { CustomerDepositRequestMoneyComponent } from './customer-deposit-request-money/customer-deposit-request-money.component';

@Component({
  selector: 'app-paid-data-entry',
  templateUrl: './paid-data-entry.component.html',
  styleUrls: ['./paid-data-entry.component.scss']
})
export class PaidDataEntryComponent {
  userType: any;
  amount: string = '';
  receivedAmountForm!: FormGroup;
  loading: any;
  loan_id: any;
  collection_type: any;
  customer_id: any;
  depositData: any[] = [];
  deposit_id: any;
  isDialogOpen!: boolean;
  // customer_id: any;

  constructor(public routes: ActivatedRoute, public _toastr: ToastrService, public router: Router, public fb: FormBuilder, public dialog: MatDialog,
    public _service: PaidDataEntryService
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);

      this.userType = userData.user_type;
      this.customer_id = userData.customer_id;
    } else {
      this.userType = null;
    }

    this.routes.params.subscribe((data) => {
      if (data && data) {

        this.loan_id = data['id'];
        this.deposit_id = data['id'];
        this.collection_type = '';
      }
    });

    this.receivedAmountForm = this.fb.group({
      amount: ['', Validators.required]
    });

    this.getCustomerDepositDetails();
  }

  dabitDeposit() {
    this.loading = true;
    let obj = {
      loan_id: this.loan_id,
      amount: this.receivedAmountForm.value.amount
    }
    this._service.collectMoney(obj).subscribe((data: any) => {
      this._toastr.success(data.message, "Success");
      this.receivedAmountForm.reset();
      this.loading = false;
    })
  }

  creditDeposit() {
  }

  openDialogRequestMoney(data?: any) {
    if (this.isDialogOpen) return;
    const dialogRef = this.dialog.open(CustomerDepositRequestMoneyComponent, {
      disableClose: true,
      data: {
        title: 'Customer Deposit Request Money',
        data: data
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      // this.delete();
      this.isDialogOpen = false;
    });
  }

  getCustomerDepositDetails() {
    this.loading = true;
    let obj = {
      customer_id: this.customer_id,
      deposit_id: this.deposit_id,
      from_day: 30
    }
    this._service.depositDetails(obj).subscribe((data: any) => {
      this.depositData = data.data;
      this.loading = false;
      debugger
    }, error => {
      this.loading = false
    });

  }
}
