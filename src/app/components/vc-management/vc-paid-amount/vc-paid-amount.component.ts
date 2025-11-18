import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-vc-paid-amount',
  templateUrl: './vc-paid-amount.component.html',
  styleUrls: ['./vc-paid-amount.component.scss']
})
export class VcPaidAmountComponent {
  @Input() title: any;
  @Input() data: any;
  amountPaidForm!: FormGroup;
  company_id: any;
  loading: boolean = false;
  // selectedStatus = "cash";
  // instalment_amount: any;
  paidtype: string = "";
  paid_amount: any;
  screenshots: any;
  bills: any;
  customerListData: any[] = [];
  vc_id: any;
  received_data: any;
  constructor(public dialogRef: MatDialogRef<VcPaidAmountComponent>,
    public router: Router, public _tostr: ToastrService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; data: any },
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
    }
    this.received_data = this.dataa.data;
    this.amountPaidForm = this.fb.group({
      // instalment_amount: ['10000.00', Validators.required],
      paid_amount: ['', Validators.required],
      paidtype: ['cash', Validators.required],
      bills: ['../../../assets/imgs/no-images.jpg'],
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

  // onStatusChange(value: string) {
  //   this.selectedStatus = value;
  // }

  selectedFile6: File | null = null;
  paidAmountImageChange(file: File | null): void {
    this.selectedFile6 = file;
  }
  selectedFileScreenshot: File | null = null;
  paidAmountScreenshotChange(file: File | null): void {
    this.selectedFileScreenshot = file;
  }
}
