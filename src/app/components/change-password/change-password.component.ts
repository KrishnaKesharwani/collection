import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonComponentService } from 'src/app/common/common-component.service';
import { ChangePasswordService } from 'src/app/services/changePassword/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, public fb: FormBuilder, public _service: ChangePasswordService) { }

  changePasswordForm!: FormGroup;
  previouspassword: string = '';
  newpassword: string = '';
  confirmpassword: string = '';
  loading = false;
  hide = true;
  newhide = true;
  confirmhide = true;

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      previous_password: ['', Validators.required],
      new_password: ['', Validators.required],
      new_password_confirmation: ['', Validators.required]
    });
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      this._service.passwordChange(this.changePasswordForm.value).subscribe((data: any) => {
        console.log(data);
        this.toastr.success('Reset Password Successfully...', 'Success');
      })


    }

    this.loading = false;
    this.changePasswordForm.reset();
  }
}
