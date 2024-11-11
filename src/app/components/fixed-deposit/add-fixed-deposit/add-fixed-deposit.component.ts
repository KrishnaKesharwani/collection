import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomActionsService } from 'src/app/services/customActions/custom-actions.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { FixedDepositService } from 'src/app/services/fixedDeposit/fixed-deposit.service';

@Component({
  selector: 'app-add-fixed-deposit',
  templateUrl: './add-fixed-deposit.component.html',
  styleUrls: ['./add-fixed-deposit.component.scss']
})
export class AddFixedDepositComponent {

  @Input() title: any;
  @Output() deleteAction = new EventEmitter();
  fixedDepositForm!: FormGroup;
  fixedDepositId!: 1;
  selectControl = new FormControl('');
  company_id: any;
  customerListData: any[] = [];
  user_type: any;
  name: string = '';
  start_date: string = '';
  end_date: string = '';
  deposit_amount: string = '';
  refund_amount: string = '';
  details: string = '';
  loading: boolean = false;

  constructor(public _router: Router, public _tostr: ToastrService, public _fixedDepositService: FixedDepositService, public dialogRef: MatDialogRef<AddFixedDepositComponent>, public _customActionService: CustomActionsService, public _service: CustomerService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }


  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.user_type = userData.user_type;
    }
    this.getCustomerList();


    this.fixedDepositForm = this.fb.group({
      customer_id: ['', Validators.required],
      name: ['', Validators.required],

      status: [''],

      deposit_amount: ['', Validators.required],
      refund_amount: [''],
      start_date: [''],
      end_date: [''],
      details: ['']
    });
    this.fixedDepositId = this.dataa.data.id;
    this.depositView();
  }

  depositView() {
    this.fixedDepositForm.patchValue({
      ...this.dataa.data,

    });
  }

  save() {
    this.loader = true;

    if (this.fixedDepositId) {
      let obj = {
        company_id: this.company_id,
        deposit_id: this.fixedDepositId,
        ...this.fixedDepositForm.value
      }

      this._fixedDepositService.update(obj).subscribe((data: any) => {
        console.log(data);

        this.loading = false;
        this.dialogRef.close(true);
        this._tostr.success(data.message, "Success");
        this._router.navigate(['/fixed_deposit']);

      })
    } else {
      if (this.fixedDepositForm.valid) {
        let obj = {
          company_id: this.company_id,
          // deposit_id: this.fixedDepositId,
          ...this.fixedDepositForm.value
        }

        this._fixedDepositService.create(obj).subscribe((data: any) => {
          console.log(data);
          this.loading = false;
          this.dialogRef.close(true);
          this._tostr.success(data.message, "Success");
          this._router.navigate(['/fixed_deposit']);

        })
      } else {
        this.fixedDepositForm.markAllAsTouched()
      }
    }



  }

  loader = false;
  getCustomerList() {
    this.loader = true;
    let obj = {
      company_id: this.company_id
    }
    this._service.getList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.customerListData = response.data;
        console.log('Customer Data', this.customerListData);
        this.loader = false;
      }
    })
  }
  onClose() {
    this.dialogRef.close();
  }


}
