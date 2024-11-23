import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { MemberService } from 'src/app/services/member/member.service';
import Swal from 'sweetalert2';
interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-assign-loan',
  templateUrl: './assign-loan.component.html',
  styleUrls: ['./assign-loan.component.scss']
})
export class AssignLoanComponent {

  selectedValue: string | undefined;
  selectedCar: string | undefined;
  total_assignlength = 0;

  @Input() title: any;
  loading: boolean = false;
  // loading: boolean = false;
  company_id: any;
  unassignedForm!: FormGroup;

  getUnassignedData: any[] = [];
  assignDepositData: any[] = [];
  assignDepositDataStatus: any;
  member_id: any;
  loanList: any;
  loanListData: any;
  unassigned_loan_id: string = "";
  selectControl = new FormControl('');

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public _service: MemberService, public dropdownService: CommonComponentService, public fb: FormBuilder, public _dailyService: DailyCollectionService,
    public _toaster: ToastrService, public _loanService: LoanService) { }

  ngOnInit() {

    const data = localStorage.getItem('CurrentUser');
    this.loading = true;
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.member_id = this.dataa?.data.id;
    }
    this.getAssignDeposit();
    this.getAssignLoan();
    this.getUnassignedLoans();
    this.getAssignCount();
  }

  getAssignCount() {
    setTimeout(() => {
      if (this.loanList?.length) {
        this.total_assignlength = this.total_assignlength + this.loanList?.length;
      }
      if (this.assignDepositData?.length) {
        this.total_assignlength = this.total_assignlength + this.assignDepositData?.length;
      }
      // this.total_assignlength = this.assignDepositData?.length + this.loanList?.length;
      this.loading = false;
    }, 3000);
  }

  getUnassignedLoans() {
    this.loading = true;
    let obj = {
      company_id: this.company_id
    }
    this._service.unassignedLoans(obj).subscribe((data: any) => {
      if (data.success) {
        this.getUnassignedData = data.data.loans;
        this.loading = false;
      }
    }, error => {
      this.getUnassignedData = [];
      this.loading = false;
    });
  }

  getSelectedValue() {
    // alert(this.selectControl.value);
  }

  assignLoan() {
    let gatLoanid = this.selectControl.value;
    if (gatLoanid != "") {

      this.loading = true;
      let obj = {
        member_id: this.member_id,
        loan_id: gatLoanid,
        reason: 'Assign Loan for member'
      }
      this._service.assignLoanMember(obj).subscribe((data: any) => {
        if (data) {
          this._toaster.success('Loan Assign Successfully!......', 'Success');
          Swal.fire({
            position: "center",
            icon: "success",
            title: 'Assign Loan',
            text: 'Loan Assign Successfully!......',
            showConfirmButton: false,
            timer: 1000
          });
          this.loading = false;
          this.loading = true;
          this.total_assignlength = 0;
          this.getUnassignedData = [];
          this.loanList = [];
          this.assignDepositData = [];
          this.getAssignLoan();
          this.getAssignDeposit();
          this.getUnassignedLoans();
          this.getAssignCount();
        } else {
          this._toaster.error(data.message, 'Error');
          this.loading = false;
        }
      }, error => {
        this.loading = false;
        this._toaster.error(error.error.message, 'Error');
      });
    }
  }

  getAssignDeposit() {
    this.loading = true;
    let obj = {
      company_id: this.company_id,
      loan_status: 'Pending',
      status: 'active'
    }
    this._dailyService.getDepositListForCustomer(obj).subscribe((data: any) => {
      this.assignDepositData = data.data.deposits;
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }

  getAssignLoan() {
    this.loading = true;
    let obj = {
      company_id: this.company_id,
      loan_status: 'approved',
      status: 'active',
      member_id: this.member_id
    }
    this._loanService.getMemberLoanList(obj).subscribe((data: any) => {
      if (data.success) {
        this.loanList = data.data.loans;
        this.loanListData = data.data;
        this.loading = false;
      } else {
        this.loanList = 0;
        // this._toaster.error(data.message, 'Error')
      }
    }, error => {
      this.loading = false;
    });
  }

  openDialogLoanRemove(data: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete_popup',
      data: {
        title: 'Are you sure?',
        subTitle:
          'You want to remove assign loan for this member!'
      }
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.removeLoanMember(data);
    });
  }

  removeLoanMember(data: any) {
    this.loading = true;
    let obj = {
      loan_id: data.id,
      member_id: data.member?.id
    }
    this._service.removeAssignLoan(obj).subscribe((data: any) => {
      if (data) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: 'Removed',
          text: 'Assign Loan Removed For This Member!',
          showConfirmButton: true,
          timer: 1000
        });
        this.total_assignlength = 0;
        this.getUnassignedData = [];
        this.loanList = [];
        this.assignDepositData = [];
        this.getAssignLoan();
        this.getAssignDeposit();
        this.getUnassignedLoans();
        this.getAssignCount();
        this.loading = false;
      }
    }, error => {
      this._toaster.error(error.error.error.member_id, 'Error');
    });

  }


}





