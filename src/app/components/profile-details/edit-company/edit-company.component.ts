import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { ActionService } from 'src/app/services/action/action.service';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

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
  name: string = '';
  email: string = '';
  status: string = '';
  currentUserLogedIn: any;
  companyData: any;
  companyLogedInData: any;
  constructor(
    private actionService: ActionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _toastr: ToastrService,
    public _service: CompanyService,
    public dialog: MatDialog,
    private dropdownService: CommonComponentService, public fb: FormBuilder) { }

  ngOnInit() {
    // debugger;


    const currentUser: any = localStorage.getItem('CurrentUser');
    this.currentUserLogedIn = JSON.parse(currentUser);

    this.user_type = this.currentUserLogedIn.user_type;

    if (this.currentUserLogedIn.company != null || this.user_type == 1) {

      const companyData: any = localStorage.getItem('CompanyData');
      this.companyLogedInData = JSON.parse(companyData);
      this.company_id = this.companyLogedInData?.id;
    }



    if (this.user_type == 1) {
      this.editForm = this.fb.group({
        company_name: [this.companyLogedInData.company_name, Validators.required],
        owner_name: [this.companyLogedInData.owner_name, Validators.required],
        mobile: [this.companyLogedInData.mobile, Validators.required],
        primary_color: [this.companyLogedInData.primary_color, Validators.required],
        secondary_color: [this.companyLogedInData.secondary_color, Validators.required],
        prefix: [this.companyLogedInData.prefix],
        address: [this.companyLogedInData.address, Validators.required],
        owner_image: [this.companyLogedInData.owner_image],
        main_logo: [this.companyLogedInData.main_logo],
        sidebar_logo: [this.companyLogedInData.sidebar_logo],
        favicon_icon: [this.companyLogedInData.favicon_icon],
        status: ['active'],
      });
    } else {
      this.editForm = this.fb.group({
        name: [this.currentUserLogedIn.name, Validators.required],
        email: [this.currentUserLogedIn.email],
        mobile: [this.currentUserLogedIn.mobile, Validators.required],
        status: ['active'],
      });
    }


  }

  updateDetails() {
    // if (this.company_id) {
    if (this.editForm.valid || this.user_type == 1) {

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
            this.openDialogonfirmation();
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
    } else if (this.editForm.valid || this.user_type == 0) {


      this._service.update(this.editForm.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this._toastr.success(data.message, 'Success');
          this.openDialogonfirmation();
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
    else {
      this.editForm.markAllAsTouched();
    }
  }

  openDialogonfirmation(): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      panelClass: 'delete_popup',
      data: {
        title: 'Are you sure to login again?',
        subTitle: 'This changes will apply after login!....',
      },
    });
    dialogRef.componentInstance.deleteAction.subscribe(() => {
      this.logout();
    });
  }

  logout() {
    localStorage.removeItem('CurrentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('CustomerData');
    localStorage.removeItem('OfferData');
    localStorage.removeItem('AfterLoginData');
    localStorage.removeItem('defaultLanguage');
    localStorage.removeItem('CompanyData');
    localStorage.removeItem('MemberData');
    localStorage.removeItem('MemberData');
    localStorage.removeItem('TEMP_DEVICE_ID');
    this.router.navigate(['/login']);
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
