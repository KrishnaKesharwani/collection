import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuperAdminDashboardService } from 'src/app/services/dashboard/super-admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userType: any;
  companyDashboardtData: any;
  basecompanyDashboardtData: any;
  memberDashboardtData: any;
  customerDashboardtData: any;
  localStorageData: any;
  constructor(private router: Router, public toaster: ToastrService, public _service: SuperAdminDashboardService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    this.localStorageData = data;
    console.log('Call Oninit Page', this.localStorageData);
    this.setApidata(this.localStorageData);
  }
  setApidata(data: any) {
    // debugger;
    if (data) {
      const userData = JSON.parse(data);
      this.userType = userData.user_type;
      if (this.userType == 0) {
        // this.getDashboardData();
        this.getDashboardBricsData('companydashboard');
        // this.router.navigate(['/superadmin_dashboard']);
      }
      else if (this.userType == 1) {
        this.getDashboardBricsData('basecompany-dashboard');
        // this.router.navigate(['/admin_dashboard']);
      } else if (this.userType == 2) {
        console.log('Call Member Page', this.userType);
        // this.getMemberDashboardData();
        // this.getDashboardBricsData('member-dashboard');
      } else if (this.userType == 3) {
        this.getDashboardBricsData('customer-dashboard');
        // this.router.navigate(['/user_dashboard']);
      } else {
        // this.router.navigate(['/dashboard']);
      }
    } else {
      this.userType = null; // or set a default value
    }
  }
  getDashboardBricsData(api_name: any) {
    this._service.getDashboardBricsData(api_name).subscribe((response: any) => {
      if (response) {
        if (api_name == 'companydashboard') {
          this.companyDashboardtData = response.data;
        } else if (api_name == 'basecompany-dashboard') {
          this.basecompanyDashboardtData = response.data;
        } else if (api_name == 'member-dashboard') {
          // this.memberDashboardtData = response.data;
        } else if (api_name == 'customer-dashboard') {
          this.customerDashboardtData = response.data;
        }
      }
    }, error => {
      this.toaster.error(error.massage, 'Error')
    });
  }

  // getDashboardData() {
  //   this._service.dashboard().subscribe((response: any) => {
  //     if (response) {
  //       this.companyDashboardtData = response.data;
  //     }
  //   }, error => {
  //     this.toaster.error(error.massage, 'Error')
  //   });
  // }

  getMemberDashboardData() {
    this._service.dashboardMember().subscribe((response: any) => {
      if (response) {
        this.memberDashboardtData = response.data;
        console.log('Member Response Data', response.data);
        console.log('Member Data', this.memberDashboardtData);
      }
    }, error => {
      this.toaster.error(error.massage, 'Error')
    });
  }

  // getCustomerDashboardData() {
  //   this._service.dashboardCustomer().subscribe((response: any) => {
  //     if (response) {
  //       this.customerDashboardtData = response.data;
  //     }
  //   }, error => {
  //     this.toaster.error(error.massage, 'Error')
  //   });
  // }


}
