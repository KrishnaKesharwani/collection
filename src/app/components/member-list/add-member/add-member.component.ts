import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CommonComponentService } from 'src/app/common/common-component.service';
import { FileuploadComponent } from 'src/app/common/fileupload/fileupload.component';
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
  constructor( public dialogRef: MatDialogRef<AddMemberComponent>, private cdr: ChangeDetectorRef, public _toastr: ToastrService, public router: Router, public _service: MemberService, public dropdownService: CommonComponentService, public fb: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public dataa: { title: string; subTitle: string, data: any },
  ) { }

  ngOnInit() {

    const data = sessionStorage.getItem('CurrentUser');
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
      image: [null]
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
  // onFileChange(imgbase64: string | ArrayBuffer | null): void {
  //   // if(imgbase64.length){
  //     // this.image_base16 =imgbase64;
  //   // }
  //   console.log('Received base64 string:', imgbase64);
  //   // Process the base64 string as needed
  // }

  saveMemberData() {
    if (this.member_id) {
      if (this.memberForm.valid) {
        this.loading = true;
        const formData = new FormData();
        // if (this.memberForm.get('image')?.value) {
        //   // this.image_base16 = this.image_base16File;
        //   const files = [
        //     { name: 'image', file: this.memberForm.get('image')?.value },
        //   ];
        //   // Convert files to base64 strings
        //   files.map(({ name, file }) => {
        //     return new Promise((resolve, reject) => {
        //       if (file) {
        //         const reader = new FileReader();
        //         reader.onloadend = () => {
        //           const base64String = reader.result as string; // Base64-encoded string
        //           formData.append(name, base64String); // Append base64 string to FormData
        //           resolve(true);
        //           this.image_base16 = base64String;
        //           // formData.append('image', base64String);
        //           console.log('Image Base String: ', base64String);
        //         };
        //         reader.onerror = () => reject(new Error(`Failed to read ${name}`));
        //         reader.readAsDataURL(file); // Read the file as a base64 string
        //       } else {
        //         resolve(true); // Resolve if no file
        //       }
        //     });
        //   });
        // }
       
        // debugger;
        // Append other form values to FormData
        Object.keys(this.memberForm.value).forEach(key => {
          // if (!['image'].includes(key)) {
            formData.append(key, this.memberForm.value[key]);
          // }
        });
        if(!this.selectedFile){
          formData.delete('image');
        }
        // formData.remov('company_id', this.company_id)
        // formData.append('member_id', this.member_id)
        formData.delete('member_login_id');
        formData.delete('password');
        // formData.append('image', this.image_base16);
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
          // setTimeout(() => {
          //   this.loading = false;
          //   this.dialog.closeAll();
          // }, 1000);
        }
      } else {
        this.memberForm.markAllAsTouched();
      }
    }
    else {
      if (this.memberForm.valid) {
        debugger;
        this.loading = true;
        const formData = new FormData();
        // const files = [
        //   { name: 'image', file: this.memberForm.get('image')?.value },
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
        Object.keys(this.memberForm.value).forEach(key => {
          // if (!['image'].includes(key)) {
            formData.append(key, this.memberForm.value[key]);
          // }
        });
        // if(!this.selectedFile){
        //   formData.delete('image');
        // }
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
          });
          // setTimeout(() => {
          //   this.loading = false;
          //   this.dialog.closeAll();
          // }, 1000);
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
    // if (this.dataa?.data) {

    this.memberForm.patchValue({
      ...this.dataa.data,
      // member_login_id: this.dataa.data.member_no,
      // status: this.dataa?.data?.status, 
      // password: this.dataa.data.user?.password_hint
    });

    // this.memberForm.controls['status'].setValue('Active');
    // console.log('FormPatch Value', this.memberForm, this.dataa.data);
    // const status = this.dataa?.data.status;

    // if (status == 'active') {
    //   this.memberForm.controls['status'].setValue('Active');
    //   // this.memberForm.controls['status'].setValue('Active');

    //   // this.dropdownService.setOptions('status', [status, 'inactive']);
    // } else {
    //   this.memberForm.controls['status'].setValue('Inactive');
    //   // this.dropdownService.setOptions('status', [status, 'active']);
    // }

    // this.cdr.detectChanges();

    // }


  }
}
