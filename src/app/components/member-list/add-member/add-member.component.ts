import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CommonComponentService } from 'src/app/common/common-component.service';
import { FileuploadComponent } from 'src/app/common/fileupload/fileupload.component';
import { ActionService } from 'src/app/services/action/action.service';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent {

  @Input() title: any;
  @Input() subTitle: any;
  @Input() data: any;
  @Input() modal: any;
  @Output() deleteAction = new EventEmitter();
  memberForm!: FormGroup;
  member_id!: any;
  name: string = '';
  mobile: string = '';
  email: string = '';
  aadhar_no: string = '';
  join_date: string = '';
  member_login_id: string = '';
  password: string = '';
  address: string = '';
  details: string = '';
  loading: boolean = false;
  company_id: any;
  memberName: string = '';
  image_base16: string = '';
  fileupload: any;
  // image_base16: string | ArrayBuffer | null = null; public fileupload: FileuploadComponent,
  constructor(public dialogRef: MatDialogRef<AddMemberComponent>, private cdr: ChangeDetectorRef, public _toastr: ToastrService, public router: Router, public _service: MemberService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any }, public deviceInfo: ActionService
  ) { }

  ngOnInit() {

    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.company_id = userData.company_id;

    }

    this.memberForm = this.fb.group({
      // memberNo: [''],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      aadhar_no: ['', Validators.required],
      join_date: ['', Validators.required],
      member_login_id: [''],
      password: [''],
      address: ['', Validators.required],
      status: ['Active'],
      image: ['']
    });
    this.company_id = this.company_id
    this.member_id = this.dataa.data.id;
    // this.dropdownService.setOptions('status', ['Active', 'Inactive']);
    if (this.dataa?.data) {
      this.memberView();
    }
  }

  selectedFile: File | null = null;
  onFileChange(file: File | null): void {
    this.selectedFile = file;
  }


  whatsappCall(rowCode: any = null) {

    this.deviceInfo.epicFunction('WHATSAPP', rowCode)
  }
  saveMemberData() {
    if (this.member_id) {
      if (this.memberForm.valid) {
        this.loading = true;
        const formData = new FormData();
        Object.keys(this.memberForm.value).forEach(key => {
          formData.append(key, this.memberForm.value[key]);
        });
        if (!this.selectedFile) {
          formData.delete('image');
        }

        formData.delete('member_login_id');
        formData.delete('password');

        formData.append('company_id', this.company_id);
        formData.append('member_id', this.member_id);
        if (formData) {
          this._service.update(formData).subscribe((maindata: any) => {
            if (maindata.success == true) {
              this._toastr.success(maindata.message, 'Success');
              this.loading = false;
              this.dialogRef.close(true);
              this.router.navigate(['/member_list']);
            } else {
              this._toastr.error(maindata.message, 'Error');
              this.loading = false;
            }
          }, error => {
            this.loading = false;
            this._toastr.error(error.error.message, 'Error');
          });

        }
      } else {
        this.memberForm.markAllAsTouched();
      }
    }
    else {
      if (this.memberForm.valid) {

        this.loading = true;
        const formData = new FormData();
        Object.keys(this.memberForm.value).forEach(key => {
          // if (!['image'].includes(key)) {
          formData.append(key, this.memberForm.value[key]);
          // }
        });

        formData.append('company_id', this.company_id);
        if (formData) {
          this._service.create(formData).subscribe((data: any) => {
            if (data.success == true) {
              this._toastr.success(data.message, 'Success');
              this.loading = false;
              this.dialogRef.close(true);
              this.router.navigate(['/member_list']);
            } else {
              this.loading = false;
              this._toastr.error(data.message, 'Error');
            }
          }, error => {
            // debugger
            this.loading = false;
            if (error.error.error?.member_login_id && error.error.message) {
              this._toastr.error(error.error.error.member_login_id, "Error");
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
        this.memberForm.markAllAsTouched();
      }
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  memberView() {
    this.memberForm.patchValue({
      ...this.dataa.data,
    });
  }
}
