import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaidDataEntryService } from 'src/app/services/paidDataEntry/paid-data-entry.service';
import { CustomerDepositRequestMoneyComponent } from './customer-deposit-request-money/customer-deposit-request-money.component';
import { DataSharingService } from 'src/app/services/data-sharing.service';

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
  depositDataSharre: any;
  deposit_id: any;
  isDialogOpen!: boolean;
  loanDataShare: any;
  loanData: any;
  // customer_id: any;

  constructor(public routes: ActivatedRoute, public _toastr: ToastrService, public router: Router, public fb: FormBuilder, public dialog: MatDialog, private _dataSharingService: DataSharingService,
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
    const depositDataResult = this._dataSharingService.getDepositData();
    const loanDataResult = this._dataSharingService.getLoanData();

    this.depositDataSharre = depositDataResult.data;
    this.loanDataShare = loanDataResult.data;
    this.collection_type = depositDataResult.type;
    debugger
    this.routes.params.subscribe(params => {
      if (!this.depositDataSharre || this.depositDataSharre.id !== params['id']
        && !this.loanDataShare || this.loanDataShare.id !== params['id']
      ) {

        console.log(this.depositDataSharre, this.loanDataShare)
        this.loan_id = params['id'];
        this.deposit_id = params['id'];

        if (this.depositDataSharre) {
          this.customer_id = this.depositDataSharre.customer_id
        } else {
          this.customer_id = this.loanDataShare.customer_id
        }
        console.warn('Data not found in service. Fetching from server...');
        // Perform API call here to fetch data by ID if needed
      }
    });

    this.receivedAmountForm = this.fb.group({
      amount: ['', Validators.required]
    });

    this.getCustomerDepositHistory();
    this.getCustomerLoanHistory();
  }

  debitAmount() {
    if (this.receivedAmountForm.valid) {
      this.loading = true;
      let obj = {
        deposit_id: this.deposit_id,
        amount: this.receivedAmountForm.value.amount,
        deposit_type: 'debit'
      }
      this._service.collectDepositMoney(obj).subscribe((data: any) => {
        this._toastr.success(data.message, "Success");

        this.receivedAmountForm.reset();
        this.getCustomerLoanHistory();
        this.getCustomerDepositHistory();
        this.loading = false;
      }, error => {
        this._toastr.error(error.error.message, "Error");
        this.loading = false;
      })
    } else {
      this.receivedAmountForm.markAllAsTouched();
    }
  }

  creditAmount() {
    if (this.collection_type == 'loan') {
      if (this.receivedAmountForm.valid) {
        this.loading = true;
        let obj = {
          loan_id: this.loan_id,
          amount: this.receivedAmountForm.value.amount
        }
        this._service.collectMoney(obj).subscribe((data: any) => {
          this._toastr.success(data.message, "Success");
          this.receivedAmountForm.reset();
          this.loading = false;
          this.getCustomerLoanHistory();
          this.getCustomerDepositHistory();
        }, error => {
          this._toastr.error(error.error.message, "Error");
          this.loading = false;
        })
      } else {
        this.receivedAmountForm.markAllAsTouched();
      }
    } else {
      if (this.receivedAmountForm.valid) {
        this.loading = true;
        let obj = {
          deposit_id: this.deposit_id,
          amount: this.receivedAmountForm.value.amount,
          deposit_type: 'credit'
        }
        this._service.collectDepositMoney(obj).subscribe((data: any) => {
          this._toastr.success(data.message, "Success");

          this.receivedAmountForm.reset();
          this.getCustomerLoanHistory();
          this.getCustomerDepositHistory();
          this.loading = false;
        }, error => {
          this._toastr.error(error.error.message, "Error");
          this.loading = false;
        })
      } else {
        this.receivedAmountForm.markAllAsTouched();
      }
    }
  }

  openDialogRequestMoney(data?: any) {
    debugger
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

  getCustomerDepositHistory() {
    this.loading = true;
    let obj = {
      customer_id: this.customer_id,
      deposit_id: this.deposit_id,
      from_day: 30
    }
    this._service.depositDetails(obj).subscribe((data: any) => {
      this.depositData = data.data.collection;
      this.loading = false;

    }, error => {
      this.loading = false
    });

  }

  getCustomerLoanHistory() {
    this.loading = true;
    let obj = {
      customer_id: this.customer_id,
      loan_id: this.loan_id,
      from_day: 30
    }
    this._service.loanDetails(obj).subscribe((data: any) => {
      this.loanData = data.data.collection;
      this.loading = false;

    }, error => {
      this.loading = false
    });


  }
}
