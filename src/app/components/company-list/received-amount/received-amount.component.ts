import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-received-amount',
  templateUrl: './received-amount.component.html',
  styleUrls: ['./received-amount.component.scss']
})
export class ReceivedAmountComponent {

  receivedAmountForm!: FormGroup;

  loading = false;
  amount: any;
  received_date: any;
  plan_id: any;

  constructor(public _tostr: ToastrService, public _service: CompanyService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any }
    , public fb: FormBuilder) { }

  ngOnInit() {
    this.plan_id = this.dataa.id
    this.receivedAmountForm = this.fb.group({

      amount: ['', Validators.required],
      received_date: ['', Validators.required],
      detail: ['']
    });
  }


  submit() {
    // Add New Company
    this.receivedAmountForm.markAllAsTouched()
    if (this.receivedAmountForm.valid) {

      this.loading = true;
      let obj = {
        amount: this.receivedAmountForm.value.amount,
        plan_id: this.plan_id,
        received_date: this.receivedAmountForm.value.received_date,
        detail: this.receivedAmountForm.value.detail
      }

      this._service.planAmount(obj).subscribe((data: any) => {
        console.log(data);
        if (data) {

          this._tostr.success(data.message, "Success");

        }
        this._tostr.error(data.message, "Error");

      })
    }
    setTimeout(() => {
      this.loading = false;
      this.dialog.closeAll();
    }, 1000);
  }
}
