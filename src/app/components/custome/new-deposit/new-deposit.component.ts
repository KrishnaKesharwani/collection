import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FixedDepositService } from 'src/app/services/fixedDeposit/fixed-deposit.service';

@Component({
  selector: 'app-new-deposit',
  templateUrl: './new-deposit.component.html',
  styleUrls: ['./new-deposit.component.scss']
})
export class NewDepositComponent {

  deleteAction: any;
  depositFrom!: FormGroup;
  loading = false;
  customername: string = "";
  company_id: any;
  details: string = '';

  constructor(public dialogRef: MatDialogRef<NewDepositComponent>, public _tostr: ToastrService, public _service: CustomerService, public dropdownService: CommonComponentService, public _fixedDepositService: FixedDepositService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.depositFrom = this.fb.group({
      customername: [this.dataa.data.name],
      assigned_member_id: ['', Validators.required],
      details: [''],
      status: ['active']
    });

    this.getActiveMemberList();
    // this.dropdownService.setOptions('status', ['Active', 'Inactive']);
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }

  onClose() {
    this.dialogRef.close();
  }

  memberdata: [] = [];
  getActiveMemberList() {
    let obj = {
      company_id: this.company_id,
      status: 'active'
    }
    this._service.activeMembers(obj).subscribe((memberData: any) => {
      console.log('member Data: ', memberData.data);
      this.memberdata = memberData.data;
      const members = memberData.data.map((member: any) => member.name);
      this.dropdownService.setOptions('assingmember', memberData.data);
    })
  }

  submitDeposit() {
    console.log(this.depositFrom.value)
    if (this.depositFrom.valid) {
      this.loading = true
      let obj = {
        company_id: this.company_id,
        customer_id: this.dataa.data.id,
        ...this.depositFrom.value
      }
      this._fixedDepositService.customerNewDeposit(obj).subscribe((data: any) => {
        console.log(data);
        this._tostr.success(data.message, 'Success');
        this.loading = false;
        this.depositFrom.reset();
        this.dialogRef.close(true);
      })
      // this.dialog.closeAll();
    } else {
      this.depositFrom.markAllAsTouched()
    }
  }
}
