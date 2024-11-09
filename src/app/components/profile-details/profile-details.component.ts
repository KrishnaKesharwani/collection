import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService, ToastToken } from 'ngx-toastr';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { ActionService } from 'src/app/services/action/action.service';
import { MemberService } from 'src/app/services/member/member.service';
import { error } from 'jquery';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})

export class ProfileDetailsComponent {

  user_type: any;
  editForm!: FormGroup;
  name: string = '';
  mobile: string = '';
  email: string = '';
  address: string = '';
  loading = false;
  member_id: any;
  company_id: any;
  memberUser: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _toastr: ToastrService,
    public _service: MemberService,
    private dropdownService: CommonComponentService, public _tostr: ToastrService,
    public fb: FormBuilder) { }

  ngOnInit() {


    const memberData = sessionStorage.getItem('MemberData');

    const currentUserData = sessionStorage.getItem('CurrentUser');

    if (memberData && currentUserData) {
      const member = JSON.parse(memberData);
      const memberUser = JSON.parse(memberData);


      const userData = JSON.parse(currentUserData);

      this.user_type = userData.user_type;
      debugger
      this.company_id = userData.company_id;
      this.member_id = member.id;
      this.memberUser = member;

    }


    this.editForm = this.fb.group({
      name: [this.memberUser?.name, Validators.required],
      // owner_name: [this.memberUser.owner_name, Validators.required],
      mobile: [this.memberUser?.mobile, Validators.required],
      email: [this.memberUser?.email, Validators.required],
      // primary_color: [this.memberUser?.primary_color, Validators.required],
      // secondary_color: [this.memberUser?.secondary_color, Validators.required],
      // aadhar_no: [, Validators.required],
      // prefix: [this.memberUser?.prefix],
      address: [this.memberUser?.address, Validators.required],

      status: [this.memberUser?.status],
      join_date: [this.memberUser?.join_date]
    });

  }

  selectedFile_profile: File | null = null;
  profileChange(file: File | null): void {
    this.selectedFile_profile = file;
    this.editForm.patchValue({ profile: file });
  }
  updateDetails() {
    if (this.member_id) {
      if (this.editForm.valid) {

        this.loading = true;
        const formData = new FormData();
        const files = [
          { name: 'image', file: this.editForm.get('image')?.value },

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
        Object.keys(this.editForm.value).forEach(key => {
          if (!['main_logo', 'sidebar_logo', 'favicon_icon', 'owner_image'].includes(key)) {
            formData.append(key, this.editForm.value[key]);
          }
        });
        formData.append('company_id', this.company_id)
        formData.append('member_id', this.member_id)
        if (formData) {
          this._service.update(formData).subscribe((data: any) => {
            if (data) {

              this._toastr.success(data.message, 'Success');
              this.router.navigate(['/dashboard']);
            } else {
              this._toastr.error(data.message, 'Error');
            }
          }, error => {
            this.loading = false;
            this._tostr.error(error.error.message, 'Error');

          });

        }

      }
      else {
        this.editForm.markAllAsTouched();
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }

}
