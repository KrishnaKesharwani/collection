import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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

  constructor(public _tostr: ToastrService, public _service: MoneyReceivedService, public fb: FormBuilder, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any },
  ) { }

  ngOnInit() {
    const companyData = sessionStorage.getItem('CompanyData');

    const currentUserData = sessionStorage.getItem('CurrentUser');

    if (companyData && currentUserData) {
      const member = JSON.parse(companyData);
      const memberUser = JSON.parse(companyData);


      const userData = JSON.parse(currentUserData);

      this.user_type = userData.user_type;
      this.company_id = userData.company_id;
      this.member_id = member.id;
      this.memberUser = member;
    }
    this.advanceAmountForm = this.fb.group({
      amount: ['10000'],
      details: [''],
    });
    // this.dropdownService.setOptions('member', ['Allot Members', 'Roshan Kanojiya', 'Bhaijan']);
  }

  save() {
    let obj = {
      company_id: this.company_id,
      member_id: this.member_id,
      ...this.advanceAmountForm.value
    }

    if (this.advanceAmountForm.valid) {
      this._service.advancedMoney(obj).subscribe((data: any) => {
        this.advanceAmountForm.reset();
        this._tostr.success(data.message, 'Success');
        this.dialog.closeAll();
      })
    } else {
      this.advanceAmountForm.markAllAsTouched()
    }

  }
}
