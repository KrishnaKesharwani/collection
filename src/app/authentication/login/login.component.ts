import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { SessionService } from 'src/app/services/session/session.service';

interface AdminFromBackend {
  company_id: string;
  customer_id: string;
  member_id: string,
  email: string;
  name: string;
  user_type: string;
  token: string;
  image: string;
}
@Injectable({
  providedIn: 'root',
})

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
  // private lastLoginImagePath: string = '';
  public lastLoginImagePath: string= './assets/imgs/login-default-image.png';
  constructor(private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    // public api: ApiService,
    private router: Router, 
    private authService: AuthService,
    // private share: SharedataService,
    private snackBar: MatSnackBar,
    private sessionService: SessionService

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
    const storedImagePath = this.sessionService.getImagePath();
    if (storedImagePath) {
      this.lastLoginImagePath = storedImagePath;
    }
  }

  updateLoginImage(newImagePath: string): void {
    this.sessionService.setImagePath(newImagePath);
  }

  credentials = { username: '', password: '' };
  errorMessage: string | null = null;

  check_authorizartion(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (data) => {
          // console.log('After Login Data: ', data)
          // debugger;
          const userLoginDetails: AdminFromBackend = {
            company_id: data.data.company?.id,
            customer_id: data.data.customer?.id,
            member_id: data.data.member?.id,
            email: data.data.email,
            name: data.data.name,
            user_type: data.data.user_type,
            token: data.token,
            image: data.data.company?.sidebar_logo
          }

          if (data.data.user_type == 1) {
            let comapnyData = {
              aadhar_no: data.data.company?.aadhar_no,
              address: data.data.company?.address,
              advance_amount: data.data.company?.advance_amount,
              company_name: data.data.company?.company_name,
              customer_count: data.data.company?.customer_count,
              details: data.data.company?.details,
              end_date: data.data.company?.end_date,
              favicon_icon: data.data.company?.favicon_icon,
              id: data.data.company?.id,
              main_logo: data.data.company?.main_logo,
              member_count: data.data.company?.member_count,
              mobile: data.data.company?.mobile,
              owner_image: data.data.company?.owner_image,
              owner_name: data.data.company?.owner_name,
              sidebar_logo: data.data.company?.sidebar_logo,
              start_date: data.data.company?.start_date,
              status: data.data.company?.status,
              total_amount: data.data.company?.total_amount,
              user_id: data.data.company?.user_id,
              primary_color: data.data.company?.primary_color,
              secondary_color: data.data.company?.secondary_color,
              prefix: data.data.company?.prefix,
            }
            localStorage.setItem('CompanyData', JSON.stringify(comapnyData));
          } else if (data.data.user_type == 2) {
            let memberData = {
              aadhar_no: data.data.member?.aadhar_no,
              address: data.data.member?.address,
              name: data.data.member?.name,
              member_no: data.data.member?.member_no,
              join_date: data.data.member?.join_date,
              mobile: data.data.member?.mobile,
              balance: data.data.member?.balance,
              status: data.data.member?.status,
              email: data.data.member?.email,
              id: data.data.member?.id,
              image: data.data.member?.image
            }
            localStorage.setItem('MemberData', JSON.stringify(memberData));
          } else {
            let customerData = {
              aadhar_no: data.data.customer?.aadhar_no,
              address: data.data.customer?.address,
              name: data.data.customer?.name,
              customer_no: data.data.customer?.customer_no,
              id: data.data.customer?.id,
              join_date: data.data.customer?.join_date,
              mobile: data.data.customer?.mobile,
              balance: data.data.customer?.balance,
              deposit_count: data.data.customer?.deposit_count,
              loan_count: data.data.customer?.loan_count,
              status: data.data.customer?.status,
              email: data.data.customer?.email,
              image: data.data.customer?.image,

            }

            localStorage.setItem('CustomerData', JSON.stringify(customerData));
          }
          localStorage.setItem('CurrentUser', JSON.stringify(userLoginDetails));   
          localStorage.setItem('AfterLoginData', JSON.stringify(data));   
          // this.lastLoginImagePath = data.company?.main_logo;
          this.updateLoginImage(data.data.company?.main_logo);
          // localStorage.setItem('lastLoginImagePath', data.company?.main_logo);
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
