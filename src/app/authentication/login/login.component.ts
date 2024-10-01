import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  invalid_login = false;
  showlogo: boolean = false;
  subscription_detail: any = {}
  subscription_detail_all: any;
  subscription_popup = 0;
  subscriptionClass = 'subscription_section';
  hide = true;
  userLoginDetails: any = [];
  usertype: any;
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    // public api: ApiService,
    private router: Router, private authService: AuthService,
    // private share: SharedataService,
    private snackBar: MatSnackBar
  ) {
    setTimeout(() => {
      this.showlogo = true;
    }, 1200);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // check_authorizartion() {
  //   this.toastr.success('Success');
  //   this.router.navigate(['/customer_list']);
  // }

  credentials = { username: '', password: '' };
  errorMessage: string | null = null;

  // constructor(private authService: AuthService) { }

  check_authorizartion(): void {

    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        this.userLoginDetails = data.user
        localStorage.setItem('CurrentUser', JSON.stringify(this.userLoginDetails));
        if (this.userLoginDetails.user_type == 0) {
          this.router.navigate(['/superadmin_dashboard']);
        } else if (this.userLoginDetails.user_type == 1) {
          this.router.navigate(['/admin_dashboard']);
        } else if (this.userLoginDetails.user_type == 2) {
          this.router.navigate(['/member_dashboard']);
        } else {
          this.router.navigate(['/user_dashboard']);
        }



        this.errorMessage = null;
      },
      error => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }


}
