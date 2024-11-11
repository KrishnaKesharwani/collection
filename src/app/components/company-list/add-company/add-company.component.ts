import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CompanyService } from 'src/app/services/company/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {

  companyForm!: FormGroup;
  // company_id!: id;
  details: string = '';
  address: string = '';
  password: string = '';
  company_login_id: string = '';
  advance_amount: string = '';
  total_amount: string = '';
  aadhar_no: string = '';
  end_date: string = '';
  start_date: string = '';
  mobile: string = '';
  owner_name: string = '';
  company_name: string = '';
  primary_color: string = "";
  secondary_color: string = "";
  prefix: string = "";
  loading: boolean = false;
  date: any;
  company_id: any;
  companyViewData: any;
  constructor(public dialogRef: MatDialogRef<AddCompanyComponent>, private cdr: ChangeDetectorRef, private router: Router, private _toastr: ToastrService, public _service: CompanyService, public dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }
    , public fb: FormBuilder) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      company_name: ['', Validators.required],
      owner_name: ['', Validators.required],
      mobile: ['', Validators.required],
      aadhar_no: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      plan: ['', Validators.required],
      total_amount: ['', Validators.required],
      advance_amount: ['', Validators.required],
      status: ['active', Validators.required],
      password: ['', Validators.required],
      company_login_id: ['', Validators.required],
      primary_color: ['#e20813', Validators.required],
      secondary_color: ['#000000', Validators.required],
      prefix: [''],
      main_logo: ['../../../assets/imgs/no-images.jpg'],
      sidebar_logo: ['../../../assets/imgs/no-images.jpg'],
      favicon_icon: ['../../../assets/imgs/no-images.jpg'],
      owner_image: [null],
      address: ['', Validators.required],
      details: ['', Validators.required]
    });
    // this.dropdownService.setOptions('plan', ['Monthly', 'Quarterly', 'Half Yerly', 'Yearly', 'Demo']);
    // this.dropdownService.setOptions('status', ['Active', 'Inactive']);
    this.company_id = this.dataa.data.id;
    if (this.company_id) {
      this.companyForm.patchValue({
        ...this.dataa.data,
        // plan: this.dataa.data.plans.plan,
      });
      this.removeControl('company_login_id');
      this.removeControl('password');
      this.removeControl('plan');
      this.removeControl('start_date');
      this.removeControl('end_date');
      this.removeControl('total_amount');
      this.removeControl('advance_amount');
      this.removeControl('company_login_id');
      this.removeControl('password');
    }
  }
  removeControl(controlName: string): void {
    this.companyForm.removeControl(controlName);
  }
  getInvalidControls(): string[] {

    const invalidControls = [];
    const controls = this.companyForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalidControls.push(name);
      }
    }
    return invalidControls;
  }
  submitCompanyDetails() {
    if (this.company_id) {
      // debugger;
      // const invalidFields = this.getInvalidControls();
      // console.log('Invalid Controls:', invalidFields);
      if (this.companyForm.valid) {
        this.loading = true;
        const formData = new FormData();
        // const files = [
        //   { name: 'main_logo', file: this.companyForm.get('main_logo')?.value },
        //   { name: 'sidebar_logo', file: this.companyForm.get('sidebar_logo')?.value },
        //   { name: 'favicon_icon', file: this.companyForm.get('favicon_icon')?.value },
        //   { name: 'owner_image', file: this.companyForm.get('owner_image')?.value },
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
        Object.keys(this.companyForm.value).forEach(key => {
          // if (!['main_logo', 'sidebar_logo', 'favicon_icon', 'owner_image'].includes(key)) {
          formData.append(key, this.companyForm.value[key]);
          // }
        });
        // alert(this.companyForm.value['main_logo']);
        // alert(this.companyForm.value['sidebar_logo']);
        // alert(this.companyForm.value['favicon_icon']);
        // alert(this.companyForm.value['owner_image']);
        if (!this.selectedFile) {
          formData.delete('main_logo');
        }
        if (!this.selectedFile2) {
          formData.delete('sidebar_logo');
        }
        if (!this.selectedFile3) {
          formData.delete('favicon_icon');
        }
        if (!this.selectedFile4) {
          formData.delete('owner_image');
        }
        formData.append('company_id', this.company_id)

        if (formData) {
          this._service.update(formData).subscribe((data: any) => {
            if (data) {
              this.dialogRef.close(true);
              this._toastr.success(data.message, 'Success');
              // this.router.navigate(['/dashboard']);
            } else {
              this._toastr.error(data.message, 'Error');
            }
          });
        }
      } else {
        this.companyForm.markAllAsTouched();
      }
    }
    else {
      if (this.companyForm.valid) {
        this.loading = true;
        const formData = new FormData();
        // const files = [
        //   { name: 'main_logo', file: this.companyForm.get('main_logo')?.value },
        //   { name: 'sidebar_logo', file: this.companyForm.get('sidebar_logo')?.value },
        //   { name: 'favicon_icon', file: this.companyForm.get('favicon_icon')?.value },
        //   { name: 'owner_image', file: this.companyForm.get('owner_image')?.value },
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
        Object.keys(this.companyForm.value).forEach(key => {
          // if (!['main_logo', 'sidebar_logo', 'favicon_icon', 'owner_image'].includes(key)) {
          formData.append(key, this.companyForm.value[key]);

          // }
        });
        // if (!this.selectedFile) {
        //   formData.delete('main_logo');
        // }
        // if (!this.selectedFile2) {
        //   formData.delete('sidebar_logo');
        // }
        // if (!this.selectedFile3) {
        //   formData.delete('favicon_icon');
        // }
        // if (!this.selectedFile4) {
        //   formData.delete('owner_image');
        // }
        if (formData) {
          this._service.create(formData).subscribe((data: any) => {
            if (data) {
              this.dialogRef.close(true);
              this._toastr.success(data.message, 'Success');
              // this.router.navigate(['/company_list']);
            }
          }, error => {
            this._toastr.error(error.massage, 'Error');
          });
          // setTimeout(() => {
          //   this.loading = false;
          //   this.dialog.closeAll();
          // }, 1000);
        }
      } else {
        this.companyForm.markAllAsTouched();
      }
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  selectedFile: File | null = null;
  mainlogoChange(file: File | null): void {
    this.selectedFile = file;
    // this.companyForm.patchValue({ main_logo: file });
  }

  selectedFile2: File | null = null;
  sidebarChange(file: File | null): void {
    this.selectedFile2 = file;
    // this.companyForm.patchValue({ sidebar_logo: file });
  }

  selectedFile3: File | null = null;
  feviconChange(file: File | null): void {
    this.selectedFile3 = file;
    // this.companyForm.patchValue({ favicon_icon: file });
  }

  selectedFile4: File | null = null;
  ownerImageChange(file: File | null): void {
    this.selectedFile4 = file;
    // this.companyForm.patchValue({ owner_image: file });
  }

  // companyView() {
  //   this.companyForm.patchValue(this.dataa.data);
  //   this.cdr.detectChanges();
  // }

}
