import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaidDataEntryService } from 'src/app/services/paidDataEntry/paid-data-entry.service';

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

  constructor(public _toastr: ToastrService, public router: Router, public fb: FormBuilder
    , public _service: PaidDataEntryService
  ) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.userType = userData.user_type
    } else {
      this.userType = null;
    }

    this.receivedAmountForm = this.fb.group({
      amount: ['', Validators.required]
    });
  }

  save() {
    this.loading = true;
    let obj = {
      loan_id: 1,
      amount: this.receivedAmountForm.value.amount
    }
    this._service.collectMoney(obj).subscribe((data: any) => {
      this._toastr.success(data.message, "Success");
      this.receivedAmountForm.reset();
      this.loading = false;
    })
  }
}
