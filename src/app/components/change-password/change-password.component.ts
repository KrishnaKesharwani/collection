import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonComponentService } from 'src/app/common/common-component.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, public fb: FormBuilder) { }

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
      previouspassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      this.toastr.success('Reset Password Successfully...', 'Success');
    }
  }
}
