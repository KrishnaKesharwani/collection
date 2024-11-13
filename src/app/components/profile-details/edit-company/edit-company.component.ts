import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent {

  user_type: any;
  editForm!: FormGroup;
  company_name: string = '';
  owner_name: string = "";
  mobile: string = '';
  primary_color: string = '';
  secondary_color: string = '';
  prefix: string = '';
  // aadhar_no: string = '';
  address: string = '';
  loading = false;
  company_id: any;
  constructor(
    private actionService: ActionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _toastr: ToastrService,
    public _service: CompanyService,
    private dropdownService: CommonComponentService, public fb: FormBuilder) { }

  ngOnInit() {
    const data = sessionStorage.getItem('CompanyData');
    const data2 = sessionStorage.getItem('CurrentUser');
    if (data && data2) {
      const userData = JSON.parse(data);
      const userData2 = JSON.parse(data2);
      this.user_type = userData;
      this.company_id = userData2.company_id;
    }
    console.log('Edit Company Data:', this.user_type);
    this.editForm = this.fb.group({
      company_name: [this.user_type.company_name, Validators.required],
      owner_name: [this.user_type.owner_name, Validators.required],
      mobile: [this.user_type.mobile, Validators.required],
      primary_color: [this.user_type.primary_color, Validators.required],
      secondary_color: [this.user_type.secondary_color, Validators.required],
      // aadhar_no: [, Validators.required],
      prefix: [this.user_type.prefix],
      address: [this.user_type.address, Validators.required],
      image: [this.user_type.main_logo],
      main_logo: [this.user_type.main_logo],
      sidebar_logo: [this.user_type.sidebar_logo],
      favicon_icon: [this.user_type.favicon_icon],
      status: ['active'],
    });

  }

  updateDetails() {
    // if (this.company_id) {
    if (this.editForm.valid) {

      this.loading = true;
      const formData = new FormData();
      Object.keys(this.editForm.value).forEach(key => {
        // if (!['main_logo', 'sidebar_logo', 'favicon_icon', 'owner_image'].includes(key)) {
        formData.append(key, this.editForm.value[key]);
        // }
      });
      if (!this.selectedFile_mainlogo) {
        formData.delete('main_logo');
      }
      if (!this.selectedFile_sidebarlogo) {
        formData.delete('sidebar_logo');
      }
      if (!this.selectedFile_feviconlogo) {
        formData.delete('favicon_icon');
      }
      if (!this.selectedFile_profile) {
        formData.delete('owner_image');
      }
      formData.append('company_id', this.company_id)

      if (formData) {
        this._service.update(formData).subscribe((data: any) => {
          if (data) {
            this.loading = false;
            this._toastr.success(data.message, 'Success');
            // this.router.navigate(['/dashboard']);
          } else {
            this.loading = false;
            this._toastr.error(data.message, 'Error');
          }
        }, error => {
          this.loading = false;
          this._toastr.error(error.message, 'Error');
        });
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  // selectedFile: File | null = null;

  // onFileChange(file: File | null): void {
  //   this.selectedFile = file;
  //   // Handle the file as needed
  // }

  selectedFile_profile: File | null = null;
  profileChange(file: File | null): void {
    // 
    this.selectedFile_profile = file;
    // this.editForm.patchValue({ profile: file });
  }

  selectedFile_mainlogo: File | null = null;
  mainlogoChange(file: File | null): void {
    this.selectedFile_mainlogo = file;
    this.editForm.patchValue({ main_logo: file });
  }

  selectedFile_sidebarlogo: File | null = null;
  sidebarChange(file: File | null): void {
    this.selectedFile_sidebarlogo = file;
    this.editForm.patchValue({ sidebar_logo: file });
  }

  selectedFile_feviconlogo: File | null = null;
  feviconChange(file: File | null): void {
    this.selectedFile_feviconlogo = file;
    this.editForm.patchValue({ favicon_icon: file });
  }

}
