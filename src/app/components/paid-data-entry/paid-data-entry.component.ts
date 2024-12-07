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
  loadingMinus: any;
  loadingPlus: any;
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
  loanRemainingAmount = 0;
  totalDepositAmount = 0;
  checkType = "";

  constructor(public routes: ActivatedRoute,
    public _toastr: ToastrService,
    public router: Router,
    public fb: FormBuilder,
    public dialog: MatDialog,
    private _dataSharingService: DataSharingService,
    public _service: PaidDataEntryService
  ) { }

  ngOnInit() {
    const getActionMaindata = this._dataSharingService.getActionData();
    if (getActionMaindata.collectType != undefined) {
      this.checkType = getActionMaindata?.collectType;
      this.customer_id = getActionMaindata.data.customer_id;
      const data: any = localStorage.getItem('CurrentUser');
      const userData = JSON.parse(data);
      this.userType = userData.user_type;
      if (this.userType == 2) {
        this.receivedAmountForm = this.fb.group({
          amount: ['', Validators.required]
        });
      }
      if (this.checkType == 'loan') {
        this.loanDataShare = getActionMaindata.data;
        this.loan_id = this.loanDataShare.id;
        this.loanRemainingAmount = this.loanDataShare.remaining_amount;
        this.getCustomerLoanHistory();
      } else {
        this.depositDataSharre = getActionMaindata.data;
        this.deposit_id = this.depositDataSharre.id;
        this.getCustomerDepositHistory();
      }
    } else {
      this.redirectPage();
    }


    // const depositDataResult = this._dataSharingService.getDepositData();
    // const loanDataResult = this._dataSharingService.getLoanData();
    // this.depositDataSharre = depositDataResult.data;
    // this.loanDataShare = loanDataResult.data;


    // this.collection_type = depositDataResult.type;
    // this.routes.params.subscribe(params => {
    //   if (!this.depositDataSharre || this.depositDataSharre.id !== params['id']
    //     && !this.loanDataShare || this.loanDataShare.id !== params['id']
    //   ) {

    //     this.loan_id = params['id'];
    //     this.deposit_id = params['id'];
    //     if (this.depositDataSharre) {
    //       this.customer_id = this.depositDataSharre.customer_id
    //     } else {
    //       this.customer_id = this.loanDataShare.customer_id
    //     }
    //     console.warn('Data not found in service. Fetching from server...');
    //     // Perform API call here to fetch data by ID if needed
    //   }
    // });
    // if (this.depositDataSharre || this.loanDataShare) {
    //   this.receivedAmountForm = this.fb.group({
    //     amount: ['', Validators.required]
    //   });
    //   this.getCustomerDepositHistory();
    //   this.getCustomerLoanHistory();
    // } else {
    //   this.redirectPage();
    // }
  }

  redirectPage() {
    this.router.navigate(['/daily_collection']);
  }

  debitAmount() {
    if (this.receivedAmountForm.valid) {
      this.loadingMinus = true;
      this.loading = true;
      let obj = {
        deposit_id: this.deposit_id,
        amount: this.receivedAmountForm.value.amount,
        deposit_type: 'debit'
      }
      this._service.collectDepositMoney(obj).subscribe((data: any) => {
        this._toastr.success(data.message, "Success");

        this.receivedAmountForm.reset();
        this.getCustomerDepositHistory();
        // this.getCustomerLoanHistory();
        this.loading = false;
        this.loadingMinus = false;
      }, error => {
        this._toastr.error(error.error.message, "Error");
        this.loading = false;
        this.loadingMinus = false;
      })
    } else {
      this.receivedAmountForm.markAllAsTouched();
    }
  }

  creditAmount() {
    if (this.checkType == 'loan') {
      if (this.receivedAmountForm.valid) {
        this.loading = true;
        this.loadingPlus = true;
        let obj = {
          loan_id: this.loan_id,
          amount: this.receivedAmountForm.value.amount
        }
        this._service.collectMoney(obj).subscribe((data: any) => {
          this._toastr.success(data.message, "Success");
          this.receivedAmountForm.reset();
          this.loading = false;
          this.loadingPlus = false;
          this.getCustomerLoanHistory();
          // this.getCustomerDepositHistory();
        }, error => {
          this._toastr.error(error.error.message, "Error");
          this.loading = false;
          this.loadingPlus = false;
        })
      } else {
        this.receivedAmountForm.markAllAsTouched();
      }
    } else {
      if (this.receivedAmountForm.valid) {
        this.loading = true;
        this.loadingPlus = true;
        let obj = {
          deposit_id: this.deposit_id,
          amount: this.receivedAmountForm.value.amount,
          deposit_type: 'credit'
        }
        this._service.collectDepositMoney(obj).subscribe((data: any) => {
          this._toastr.success(data.message, "Success");

          this.receivedAmountForm.reset();
          // this.getCustomerLoanHistory();
          this.getCustomerDepositHistory();
          this.loading = false;
          this.loadingPlus = false;
        }, error => {
          this._toastr.error(error.error.message, "Error");
          this.loading = false;
          this.loadingPlus = false;
        })
      } else {
        this.receivedAmountForm.markAllAsTouched();
      }
    }
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
      this.totalDepositAmount = data.data.total_balance;
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
      this.loanRemainingAmount = data.data.remaining_amount;
    }, error => {
      this.loading = false
    });
  }
}
