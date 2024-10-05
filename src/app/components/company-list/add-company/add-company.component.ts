import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  loading: boolean = false;
  date: any;
  company_id: any;
  constructor(private router: Router, private _toastr: ToastrService, public _service: CompanyService, private dropdownService: CommonComponentService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, id: any }
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
      status: ['', Validators.required],

      password: ['', Validators.required],
      company_login_id: [''],
      main_logo: [null],
      sidebar_logo: [null],
      favicon_icon: [null],
      owner_image: [null],
      address: ['', Validators.required],
      details: ['', Validators.required]
    });

    this.dropdownService.setOptions('plan', ['Monthly', 'Quarterly', 'Half Yerly', 'Yearly', 'Demo']);
    this.dropdownService.setOptions('status', ['Active', 'Inactive']);
  }


  save() {
    this.company_id = this.dataa.id

    if (this.company_id) {
      if (this.companyForm.valid) {
        this.loading = true;
        const formData = new FormData();
        const files = [
          { name: 'main_logo', file: this.companyForm.get('main_logo')?.value },
          { name: 'sidebar_logo', file: this.companyForm.get('sidebar_logo')?.value },
          { name: 'favicon_icon', file: this.companyForm.get('favicon_icon')?.value },
          { name: 'owner_image', file: this.companyForm.get('owner_image')?.value },
        ];

        // Convert files to base64 strings
        files.map(({ name, file }) => {
          return new Promise((resolve, reject) => {
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64String = reader.result as string; // Base64-encoded string
                formData.append(name, base64String); // Append base64 string to FormData
                resolve(true);
              };
              reader.onerror = () => reject(new Error(`Failed to read ${name}`));
              reader.readAsDataURL(file); // Read the file as a base64 string
            } else {
              resolve(true); // Resolve if no file
            }
          });
        });

        // Append other form values to FormData
        Object.keys(this.companyForm.value).forEach(key => {
          if (!['main_logo', 'sidebar_logo', 'favicon_icon', 'owner_image'].includes(key)) {
            formData.append(key, this.companyForm.value[key]);
          }
        });
        formData.append('company_id', this.company_id)
        if (formData) {
          this._service.update(formData).subscribe((data: any) => {
            if (data) {

              this._toastr.success(data.message, 'Success');
              this.router.navigate(['/dashboard']);
            } else {
              this._toastr.error(data.message, 'Error');
            }
          });
          setTimeout(() => {
            this.loading = false;
            this.dialog.closeAll();
          }, 1000);
        }
      } else {
        this.companyForm.markAllAsTouched();
      }
    }
    else {
      if (this.companyForm.valid) {
        this.loading = true;
        const formData = new FormData();
        const files = [
          { name: 'main_logo', file: this.companyForm.get('main_logo')?.value },
          { name: 'sidebar_logo', file: this.companyForm.get('sidebar_logo')?.value },
          { name: 'favicon_icon', file: this.companyForm.get('favicon_icon')?.value },
          { name: 'owner_image', file: this.companyForm.get('owner_image')?.value },
        ];

        // Convert files to base64 strings
        files.map(({ name, file }) => {
          return new Promise((resolve, reject) => {
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const base64String = reader.result as string; // Base64-encoded string
                formData.append(name, base64String); // Append base64 string to FormData
                resolve(true);
              };
              reader.onerror = () => reject(new Error(`Failed to read ${name}`));
              reader.readAsDataURL(file); // Read the file as a base64 string
            } else {
              resolve(true); // Resolve if no file
            }
          });
        });

        // Append other form values to FormData
        Object.keys(this.companyForm.value).forEach(key => {
          if (!['main_logo', 'sidebar_logo', 'favicon_icon', 'owner_image'].includes(key)) {
            formData.append(key, this.companyForm.value[key]);

          }
        });

        if (formData) {
          this._service.create(formData).subscribe((data: any) => {
            if (data) {
              this._toastr.success(data.message, 'Success');
              this.router.navigate(['/company_list']);
            } else {
              this._toastr.error(data.message, 'Error');
            }
          });
          setTimeout(() => {
            this.loading = false;
            this.dialog.closeAll();
          }, 1000);
        }
      } else {
        this.companyForm.markAllAsTouched();
      }
    }

  }

  selectedFile: File | null = null;

  onFileChange(file: File | null): void {
    this.selectedFile = file;
    this.companyForm.patchValue({ main_logo: file });
  }

  selectedFile2: File | null = null;

  onFileChange2(file: File | null): void {
    this.selectedFile2 = file;
    this.companyForm.patchValue({ sidebar_logo: file });
  }

  selectedFile3: File | null = null;

  onFileChange3(file: File | null): void {
    this.selectedFile3 = file;
    this.companyForm.patchValue({ favicon_icon: file });
  }
  selectedFile4: File | null = null;

  onFileChange4(file: File | null): void {
    this.selectedFile4 = file;
    this.companyForm.patchValue({ owner_image: file });
  }

  update() {
    // Add New Company
    this.companyForm.markAllAsTouched();
    this.loading = true;
    if (this.companyForm.valid) {
      this.loading = false;
      // this.dialog.closeAll();
    }
  }




}
