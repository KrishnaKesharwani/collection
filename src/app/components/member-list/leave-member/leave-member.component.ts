import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DailyCollectionService } from 'src/app/services/dailyCollection/daily-collection.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-leave-member',
  templateUrl: './leave-member.component.html',
  styleUrls: ['./leave-member.component.scss']
})
export class LeaveMemberComponent {
  member_id: any;
  loading: any;
  data: any;
  selectControl = new FormControl('');
  memberForm!: FormGroup;
  // join_date: string|Date|null;
  date: string = '';
  member_login_id: string = '';
  company_id: any;
  assignDepositData: any;
  loanList: any;
  loanListData: any;
  total_assignlength = 0;

  constructor(public dialogRef: MatDialogRef<LeaveMemberComponent>, private cdr: ChangeDetectorRef, public _toastr: ToastrService, public router: Router, public _service: MemberService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public _loanService: LoanService, public _dailyService: DailyCollectionService,
    public _customerService: CustomerService) { }
  ngOnInit() {

    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.memberForm = this.fb.group({

      date: [new Date(), Validators.required],
      assigned_member_id: ['']
    });
    this.company_id = this.company_id
    this.member_id = this.dataa.data.id;

    this.viewMemberDetails();
    this.getAssignDeposit();
    this.getAssignLoan();
    this.getAssignCount();
  }

  onClose() {
    this.dialogRef.close();
  }

  viewMemberDetails() {
    this.data = this.dataa.data;
    this.getActiveMemberList();

  }

  submit() {
    this.loading = true;
    if (this.memberForm.valid) {

    } else {
      this.memberForm.markAllAsTouched();
    }
  }

  memberdata: [] = [];
  getActiveMemberList() {
    let obj = {
      company_id: this.company_id,
      status: 'active'
    }
    this._customerService.activeMembers(obj).subscribe((memberData: any) => {
      this.memberdata = memberData.data;
      const members = memberData.data.map((member: any) => member.name);
      this.dropdownService.setOptions('assingmember', memberData.data);
    })
  }

  getAssignDeposit() {
    this.loading = true;
    let obj = {
      company_id: this.company_id,
      status: 'active',
      member_id: this.member_id,
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
      loan_status: 'paid',
      status: 'active',
      member_id: this.member_id
    }
    this._loanService.getMemberLoanList(obj).subscribe((data: any) => {
      if (data.success) {
        this.loanList = data.data.loans;
        this.loanListData = data.data;
        this.loading = false;
        console.log('Availble Loan List', this.loanList);
      } else {
        this.loanList = 0;
        // this._toaster.error(data.message, 'Error')
      }
    }, error => {
      this.loading = false;
      console.log('Availble Loan List', this.loanList);
    });
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
    }, 1000);
  }
}
