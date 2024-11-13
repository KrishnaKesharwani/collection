import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent {

  user_type: any;
  editForm!: FormGroup;
  name: string = '';
  mobile: string = '';
  email: string = '';
  address: string = '';
  loading = false;
  member_id: any;
  company_id: any;
  customer_id: any;
  customerData: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _toastr: ToastrService,
    private dropdownService: CommonComponentService,
    public _service: CustomerService,
    public fb: FormBuilder) { }

  ngOnInit() {

    const customerData = sessionStorage.getItem('CustomerData');

    const currentUserData = sessionStorage.getItem('CurrentUser');
    if (customerData && currentUserData) {

      const customer = JSON.parse(customerData);


      const userData = JSON.parse(currentUserData);

      this.user_type = userData.user_type;

      this.company_id = userData.company_id;
      this.member_id = userData.member_id;
      this.customer_id = customer.id;
      this.customerData = customer;

    } else {

    }

    this.editForm = this.fb.group({
      name: [this.customerData.name, Validators.required],

      mobile: [this.customerData.mobile, Validators.required],
      email: [this.customerData.email, Validators.required],

      address: [this.customerData.address, Validators.required],

      status: [this.customerData.status],
      join_date: [this.customerData.join_date],
      image: [this.customerData.image]
    });

  }

  selectedFile_profile: File | null = null;
  profileChange(file: File | null): void {
    this.selectedFile_profile = file;
    this.editForm.patchValue({ profile: file });
  }
  updateDetails() {

    if (this.customer_id) {
      if (this.editForm.valid) {

        this.loading = true;
        const formData = new FormData();
        Object.keys(this.editForm.value).forEach(key => {
          // if (!['image'].includes(key)) {
          formData.append(key, this.editForm.value[key]);
          // }
        });

        formData.append('company_id', this.company_id)
        formData.append('customer_id', this.customer_id)
        if (formData) {

          this._service.update(formData).subscribe((data: any) => {
            if (data) {

              this._toastr.success(data.message, 'Success');
              this.loading = false;
              // this.dialog.closeAll();
              // this._router.navigate(['/customer_list']);
            } else {
              this._toastr.error(data.message, 'Error');
              this.loading = false;
            }
          });

        }
      } else {
        this.editForm.markAllAsTouched();
      }
    }
  }

}
