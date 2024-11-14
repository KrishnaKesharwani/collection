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
  // foods: Food[] = [
  //   { value: 'steak-0', viewValue: 'Steak' },
  //   { value: 'pizza-1', viewValue: 'Pizza' },
  //   { value: 'tacos-2', viewValue: 'Tacos' },
  // ];

  // cars: Car[] = [
  //   { value: 'volvo', viewValue: 'Volvo' },
  //   { value: 'saab', viewValue: 'Saab' },
  //   { value: 'mercedes', viewValue: 'Mercedes' },
  // ];

  // displayedColumns: string[] = ['cno', 'customer_name', 'contact', 'amount', 'pending', 'installment', 'status', 'remove'];
  // data: { cno: number; customer_name: string; contact: string; amount: number; pending: boolean; installment: string; status: string }[] = [
  //   { cno: 1, customer_name: 'Alice', contact: '12345', amount: 100, pending: false, installment: 'Monthly', status: 'Active' },
  //   { cno: 2, customer_name: 'Bob', contact: '67890', amount: 200, pending: true, installment: 'Yearly', status: 'Pending' },
  //   // Add more data as necessary
  // ];

  @Input() title: any;
  loading: boolean = false;
  mainpageloader: boolean = false;
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
    this.mainpageloader = true;
    console.log('Return data :', this.dataa)
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.member_id = this.dataa?.data.id;
    }

    // this.unassignedForm = this.fb.group({
    //   unassigned_member_id: ['', Validators.required]
    // })
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
      this.mainpageloader = false;
    }, 3000);
  }

  getUnassignedLoans() {
    let obj = {
      company_id: this.company_id
    }
    this._service.unassignedLoans(obj).subscribe((data: any) => {
      if (data.success) {
        this.getUnassignedData = data.data.loans;
        console.log('Unassign Loan Data inner Call: ', this.getUnassignedData);
        // this.dropdownService.setOptions('unassingmember', data.data);
      }
    }, error => {
      this.getUnassignedData = [];
      // this._toaster.error(error.error.message, 'Error');
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
          this.mainpageloader = true;
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
    let obj = {
      company_id: this.company_id,
      loan_status: 'Pending',
      status: 'active'
    }
    this._dailyService.getDepositListForCustomer(obj).subscribe((data: any) => {
      this.assignDepositData = data.data.deposits;
      // this.assignDepositDataStatus = data.data.deposits;
    })
  }

  getAssignLoan() {
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
      } else {
        this.loanList = 0;
        // this._toaster.error(data.message, 'Error')
      }
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
    this.mainpageloader = true;
    let obj = {
      loan_id: data.id,
      member_id: data.member?.id
    }
    // console.log(obj);
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
        this.mainpageloader = false;
      }
    }, error => {
      this._toaster.error(error.error.error.member_id, 'Error');
    });

  }

  // openDialogDepositRemove(data: any) {
  //   const dialogRef = this.dialog.open(DeleteComponent, {
  //     panelClass: 'delete_popup',
  //     data: {
  //       title: 'Are you sure?',
  //       subTitle:
  //         'You want to remove!'
  //     }
  //   });
  //   dialogRef.componentInstance.deleteAction.subscribe(() => {
  //     this.deleteDeposit(data);
  //   });
  // }

  // deleteDeposit(data: any) {

  //   let obj = {
  //     deposit_id: data.id,
  //     member_id: data.member?.id

  //   }
  //   console.log(obj);

  //   this._service.removeAssignDeposit(obj).subscribe((data: any) => {
  //     if (data) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: 'Removed',
  //         text: 'Assign Deposit Removed!',
  //         showConfirmButton: true,
  //         timer: 1500
  //       });
  //     }

  //   }, error => {
  //     this.loading = false;
  //     this._toaster.error(error.error.error.member_id, 'Error');

  //   });
  //   this.getAssignLoan();
  //   this.getAssignDeposit();
  //   this.dialog.closeAll()
  // }

}





