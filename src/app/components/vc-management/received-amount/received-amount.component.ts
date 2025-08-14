import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { OffersService } from 'src/app/services/offers/offers.service';

@Component({
  selector: 'app-received-amount',
  templateUrl: './received-amount.component.html',
  styleUrls: ['./received-amount.component.scss']
})
export class ReceivedAmountComponent {
  @Input() title: any;
  @Input() data: any;
  @Input() modal: any;

  @Output() deleteAction = new EventEmitter();
  amountReceivedForm!: FormGroup;
  company_id: any;
  loading: boolean = false;
  selectedStatus = "cash";
  instalment_amount: any;
  paidtype: string = "";
  received_amount: any;
  screenshots: any;
  customerListData: any[] = [];
  vc_id: any;
  constructor(public dialogRef: MatDialogRef<ReceivedAmountComponent>,
     public customer_service: CustomerService, public router: Router, public _tostr: ToastrService, public _service: OffersService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; data: any },
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.amountReceivedForm = this.fb.group({
      instalment_amount: ['10000.00', Validators.required],
      paidtype: ['cash', Validators.required],
      received_amount: ['', Validators.required],
      screenshots: ['../../../assets/imgs/no-images.jpg'],
      details: [''],
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  saveDetails() {
    // if (this.vc_id) {
    //   if (this.amountReceivedForm.valid) {
    //     this.loading = true;
    //     const formData = new FormData();
    //     Object.keys(this.amountReceivedForm.value).forEach(key => {
    //       if (key === 'default_offer') {
    //         if (this.amountReceivedForm.value['default_offer']) {
    //           formData.append(key, '1');
    //         } else {
    //           formData.append(key, '0');
    //         }
    //       } else {
    //         formData.append(key, this.amountReceivedForm.value[key]);
    //       }
    //     });
    //     if (!this.selectedFile) {
    //       formData.delete('image');
    //     }
    //     formData.append('company_id', this.company_id);
    //     formData.append('offer_id', this.offer_id);
    //     // let obj = {
    //     //   offer_id: this.offer_id,
    //     //   company_id: this.company_id,
    //     //   ...this.amountReceivedForm.value
    //     // }
    //     this._service.update(formData).subscribe((data: any) => {
    //       this._tostr.success(data.message, "Success");
    //       this.loading = false;
    //       this.dialogRef.close(true);
    //       this.router.navigate(['/offers']);
    //     })

    //   } else {
    //     this.amountReceivedForm.markAllAsTouched()
    //   }
    // } else {
    //   if (this.amountReceivedForm.valid) {
    //     this.loading = true;
    //     const formData = new FormData();
    //     Object.keys(this.amountReceivedForm.value).forEach(key => {
    //       if (key === 'default_offer') {
    //         if (this.amountReceivedForm.value['default_offer']) {
    //           formData.append(key, '1');
    //         } else {
    //           formData.append(key, '0');
    //         }
    //       } else {
    //         formData.append(key, this.amountReceivedForm.value[key]);
    //       }
    //       // formData.append(key, this.amountReceivedForm.value[key]);
    //     });
    //     if (!this.selectedFile) {
    //       formData.delete('image');
    //     }
    //     formData.append('company_id', this.company_id);
    //     this._service.create(formData).subscribe((data: any) => {
    //       this._tostr.success(data.message, "Success");
    //       this.loading = false;
    //       this.dialogRef.close(true);
    //       this.router.navigate(['/offers']);
    //     })

    //   } else {
    //     this.amountReceivedForm.markAllAsTouched()
    //   }
    // }
  }

  onStatusChange(value: string) {
    this.selectedStatus = value;
  }

  selectedFile6: File | null = null;
  paidAmountImageChange(file: File | null): void {
    this.selectedFile6 = file;
  }

  getCustomerList() {
    let obj = {
      company_id: this.company_id
    }
    this.customer_service.getList(obj).subscribe((response: any) => {
      if (response && Array.isArray(response.data)) {
        this.customerListData = response.data;
      }
    })
  }
}
