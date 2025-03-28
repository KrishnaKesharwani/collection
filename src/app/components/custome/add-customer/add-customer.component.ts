import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { ActionService } from 'src/app/services/action/action.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  @Input() title: any;
  @Input() subTitle: any;
  @Output() deleteAction = new EventEmitter();

  customerForm!: FormGroup;
  // customer_Id!: 1;
  address: string = '';
  email: string = '';
  mobile: string = '';
  loading = false;
  name: string = '';
  aadhar_no: string = '';
  join_date: string = '';
  customer_login_id: string = '';
  password: string = '';
  customer_id: any;
  company_id: string = '';
  selectedFile: File | null = null;
  user_type: any;
  getWhatsappno: any;
  constructor(public dialogRef: MatDialogRef<AddCustomerComponent>, private cdr: ChangeDetectorRef, public _toastr: ToastrService, public _router: Router, public _service: CustomerService, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }
    , public fb: FormBuilder, public deviceInfo: ActionService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    // const dataAfterLogin: any = localStorage.getItem('AfterLoginData');
    // this.getWhatsappno =JSON.parse(dataAfterLogin);
    // this.getWhatsappno = this.getWhatsappno.data?.mobile;
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.user_type = userData.user_type;
    }
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      aadhar_no: ['', Validators.required],
      customer_login_id: ['', Validators.required],
      password: ['', Validators.required],
      join_date: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
      image: [null],
      adhar_front: ['../../../assets/imgs/no-images.jpg'],
      adhar_back: ['../../../assets/imgs/no-images.jpg']
    });

    // this.dropdownService.setOptions('status', ['Active', 'Inactive']);
    this.company_id = this.company_id;
    this.customer_id = this.dataa?.data?.id;
    if (this.dataa?.data) {
      this.customerForm.patchValue({
        ...this.dataa.data,
        customer_login_id: this.dataa.data.user.email,
        password: this.dataa.data.user.password_hint
        // status: this.dataa.data.status,
      });
    }
  }

  getEmailValue(value: any) {


  }
  updateLoginId(newEmail: string): void {
    this.email = newEmail; // Update email value
    this.customer_login_id = newEmail; // Autofill customer_login_id
  }
  onFileChange(file: File | null): void {
    this.selectedFile = file;
  }

  onClose() {
    this.dialogRef.close();
  }

  selectedFile5: File | null = null;
  aadharFrontImageChange(file: File | null): void {
    this.selectedFile5 = file;
  }
  selectedFile6: File | null = null;
  aadharBackImageChange(file: File | null): void {
    this.selectedFile6 = file;
  }

  whatsappCall(rowCode: any = null) {
    this.deviceInfo.epicFunction('WHATSAPP', rowCode)
  }

  saveCustomerData() {
    if (this.customer_id) {
      const formData = new FormData();
      formData.delete('customer_login_id');
      formData.delete('password');
      if (this.customerForm.valid) {
        this.loading = true;
        Object.keys(this.customerForm.value).forEach(key => {
          // if (!['main_logo', 'sidebar_logo', 'favicon_icon', 'owner_image'].includes(key)) {
          formData.append(key, this.customerForm.value[key]);
          // }
        });
        if (!this.selectedFile) {
          formData.delete('image');
        }
        if (!this.selectedFile5) {
          formData.delete('adhar_front');
        }
        if (!this.selectedFile6) {
          formData.delete('adhar_back');
        }
        formData.append('company_id', this.company_id)
        formData.append('customer_id', this.customer_id)
        if (formData) {
          this._service.update(formData).subscribe((data: any) => {
            if (data) {
              this.loading = false;
              this.dialogRef.close(true);
              this._toastr.success(data.message, 'Success');
              this._router.navigate(['/customer_list']);
            } else {
              this._toastr.error(data.message, 'Error');
            }
          }, error => {
            this.loading = false;
            this._toastr.error(error.error.message, 'Error');
          });
        }
      } else {
        this.customerForm.markAllAsTouched();
      }
    }
    else {
      if (this.customerForm.valid) {
        this.loading = true;
        const formData = new FormData();
        Object.keys(this.customerForm.value).forEach(key => {
          // if (!['image'].includes(key)) {
          formData.append(key, this.customerForm.value[key]);
          // }
        });
        if (!this.selectedFile) {
          formData.delete('image');
        }
        if (!this.selectedFile5) {
          formData.delete('adhar_front');
        }
        if (!this.selectedFile6) {
          formData.delete('adhar_back');
        }
        formData.append('company_id', this.company_id);
        if (formData) {
          this._service.create(formData).subscribe((data: any) => {
            if (data.success == true) {
              this.loading = false;
              this.dialogRef.close(true);
              this._toastr.success(data.message, 'Success');
              // this._router.navigate(['/customer_list']);
              this.customerForm.reset();
            }
          }, error => {
            // debugger
            this.loading = false;
            if (error.error.error?.customer_login_id && error.error.message) {
              this._toastr.error(error.error.error.customer_login_id, "Error");
            } else if (error.error.error?.mobile && error.error.message) {
              this._toastr.error(error.error.error.mobile, "Error");
            } else if (error.error.error?.email && error.error.message) {
              this._toastr.error(error.error.error.email, "Error");
            } else {
              this._toastr.error(error.error.message, "Error");
            }

          });
        }
      } else {
        this.customerForm.markAllAsTouched();
      }
    }
  }

  customerView() {
    this.customerForm.patchValue({
      ...this.dataa.data,
      // member_login_id: this.dataa.data.member_no,

      // status: this.dataa.data.status,
      // password: this.dataa.data.user?.password_hint
    });
    // const status = this.dataa?.data.status;
    // if (status == 'active') {
    //   this.dropdownService.setOptions('status', [status, 'inactive']);
    // } else {
    //   this.dropdownService.setOptions('status', [status, 'active']);
    // }
  }

}
