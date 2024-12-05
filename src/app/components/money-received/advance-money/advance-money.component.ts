import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { MoneyReceivedService } from 'src/app/services/moneyReceived/money-received.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-advance-money',
  templateUrl: './advance-money.component.html',
  styleUrls: ['./advance-money.component.scss']
})
export class AdvanceMoneyComponent {
  @Input() title: any;
  loading = false;
  advanceAmountForm!: FormGroup;
  advancedetails: string = "";
  advanceamount: string = "";
  user_type: any;
  company_id: any;
  member_id: any;
  memberUser: any;
  amount: any;

  constructor(public dialogRef: MatDialogRef<AdvanceMoneyComponent>, public _tostr: ToastrService, public _service: MoneyReceivedService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) 
  public dataa: { title: string; subTitle: string, id: any; data: any; },
  ) { }

  ngOnInit() {
    // const companyData = localStorage.getItem('CompanyData');
    // const currentUserData: any = localStorage.getItem('CurrentUser');
    // debugger;
    // const userData = JSON.parse(currentUserData);
    // this.company_id = userData.company_id;
    // if (companyData && currentUserData) {
    //   const member = JSON.parse(companyData);
    //   const memberUser = JSON.parse(companyData);
    //   const userData = JSON.parse(currentUserData);
    //   this.user_type = userData.user_type;
    //   this.company_id = userData.company_id;
    //   this.member_id = member.id;
    //   this.memberUser = member;
    // }
    this.advanceAmountForm = this.fb.group({
      amount: ['', Validators.required],
      details: [''],
    });
    // this.dropdownService.setOptions('member', ['Allot Members', 'Roshan Kanojiya', 'Bhaijan']);
  }

  onClose() {
    this.dialogRef.close();
  }

  payAdvanceMoney() {
    if (this.advanceAmountForm.valid) {
      this.loading = true;
      let obj = {
        company_id: this.dataa.data.company_id,
        member_id: this.dataa.data.member_id,
        ...this.advanceAmountForm.value
      }
      this._service.advancedMoney(obj).subscribe((data: any) => {
        this.advanceAmountForm.reset();
        this._tostr.success(data.message, 'Success');
        this.dialogRef.close(true);
        this.loading = false;
      }, error => {
        this.loading = false;
        this._tostr.error(error.error.message, 'Error');
      })
    } else {
      this.advanceAmountForm.markAllAsTouched()
    }
  }
}
