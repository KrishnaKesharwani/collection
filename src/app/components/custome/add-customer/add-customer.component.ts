import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
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

  constructor(public dialogRef: MatDialogRef<AddCustomerComponent>, private cdr: ChangeDetectorRef, public _toastr: ToastrService, public _router: Router, public _service: CustomerService, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }
    , public fb: FormBuilder) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;
      this.user_type = userData.user_type;
      console.log('Customer Data: ', data);
    }
    this.customerForm = this.fb.group({
      // customerNo: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      aadhar_no: ['', Validators.required],
      customer_login_id: ['', Validators.required],
      password: ['', Validators.required],
      join_date: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      status: [''],
      image: [null]
    });
    // this.dropdownService.setOptions('status', ['Active', 'Inactive']);
    this.company_id = this.company_id;
    this.customer_id = this.dataa.data.id;
    if (this.dataa?.data) {
      this.customerForm.patchValue({
        ...this.dataa.data,
        customer_login_id: this.dataa.data.user.email,
        password: this.dataa.data.user.password_hint
        // status: this.dataa.data.status,
      });
    }
  }

  onFileChange(file: File | null): void {
    this.selectedFile = file;
  }

  onClose() {
    this.dialogRef.close();
  }

  saveCustomerData() {
    if (this.customer_id) {
      const formData = new FormData();
      // for (const field in this.customerForm.controls) {
      //   if (this.customerForm.controls[field].invalid) {
      //     console.log(`Field ${field} is invalid`);
      //     console.log(this.customerForm.controls[field].errors); // This will log the errors for the specific field
      //   }
      // }
      formData.delete('customer_login_id');
      formData.delete('password');
      if (this.customerForm.valid) {
        this.loading = true;
        // const files = [
        //   { name: 'image', file: this.customerForm.get('image')?.value },
        // ];
        // Convert files to base64 strings
        // files.map(({ name, file }) => {
        //   return new Promise((resolve, reject) => {
        //     if (file) {
        //       const reader = new FileReader();
        //       reader.onloadend = () => {
        //         const base64String = reader.result as string; // Base64-encoded string
        //         formData.append(name, base64String); // Append base64 string to FormData
        //         resolve(true);
        //       };
        //       reader.onerror = () => reject(new Error(`Failed to read ${name}`));
        //       reader.readAsDataURL(file); // Read the file as a base64 string
        //     } else {
        //       resolve(true); // Resolve if no file
        //     }
        //   });
        // });
        // Append other form values to FormData
        Object.keys(this.customerForm.value).forEach(key => {
          // if (!['main_logo', 'sidebar_logo', 'favicon_icon', 'owner_image'].includes(key)) {
          formData.append(key, this.customerForm.value[key]);
          // }
        });
        if (!this.selectedFile) {
          formData.delete('image');
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
        // const files = [
        //   { name: 'image', file: this.customerForm.get('image')?.value },

        // ];

        // // Convert files to base64 strings
        // files.map(({ name, file }) => {
        //   return new Promise((resolve, reject) => {
        //     if (file) {
        //       const reader = new FileReader();
        //       reader.onloadend = () => {
        //         const base64String = reader.result as string; // Base64-encoded string
        //         formData.append(name, base64String); // Append base64 string to FormData
        //         resolve(true);
        //       };
        //       reader.onerror = () => reject(new Error(`Failed to read ${name}`));
        //       reader.readAsDataURL(file); // Read the file as a base64 string
        //     } else {
        //       resolve(true); // Resolve if no file
        //     }
        //   });
        // });
        // Append other form values to FormData
        Object.keys(this.customerForm.value).forEach(key => {
          // if (!['image'].includes(key)) {
          formData.append(key, this.customerForm.value[key]);
          // }
        });
        if (!this.selectedFile) {
          formData.delete('image');
        }
        formData.append('company_id', this.company_id);
        if (formData) {
          this._service.create(formData).subscribe((data: any) => {
            if (data.success == true) {
              this.loading = false;
              this.dialogRef.close(true);
              this._toastr.success(data.message, 'Success');
              this._router.navigate(['/customer_list']);
              this.customerForm.reset();
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
