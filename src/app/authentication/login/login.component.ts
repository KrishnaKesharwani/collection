import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

interface AdminFromBackend {
  company_id: string;
  customer_id: string;
  member_id: string,
  email: string;
  name: string;
  user_type: string;
  token: string;
}
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
  showSidebar: any;
  showHeader: any;
  customer_id: any;
  member_id: any;
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


  credentials = { username: '', password: '' };
  errorMessage: string | null = null;

  // constructor(private authService: AuthService) { }

  check_authorizartion(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (data) => {
          const userLoginDetails: AdminFromBackend = {
            company_id: data.data.company?.id,
            customer_id: data.data.customer?.id,
            member_id: data.data.member?.id,
            email: data.data.email,
            name: data.data.name,
            user_type: data.data.user_type,
            token: data.token
          }
          sessionStorage.setItem('CurrentUser', JSON.stringify(userLoginDetails));
          // this.showSidebar = userLoginDetails.user_type;
          // this.showHeader = userLoginDetails.user_type;
          this.loading = false;
          this.toastr.success(data.message, 'Success');
          this.router.navigate(['/dashboard']);

          // this.errorMessage = null;
        },
        error => {
          this.loading = false;
          this.toastr.error(error.error.message, 'Error');

        }
      );
    }
  }


}
