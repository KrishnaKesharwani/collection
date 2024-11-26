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
  memberDashboardtData: any;
  customerDashboardtData: any;
  constructor(private router: Router, public toaster: ToastrService, public _service: SuperAdminDashboardService) { }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    // debugger;
    if (data) {
      const userData = JSON.parse(data);
      this.userType = userData.user_type
      if (this.userType == 0) {
        this.getDashboardData();
        // this.router.navigate(['/superadmin_dashboard']);
      }
       else if (this.userType == 1) {

        // this.router.navigate(['/admin_dashboard']);
      } else if (this.userType == 2) {
        this.getMemberDashboardData();
        // this.router.navigate(['/member_dashboard']);
      } else if (this.userType == 3) {
        this.getCustomerDashboardData();
        // this.router.navigate(['/user_dashboard']);
      } else {
        // this.router.navigate(['/dashboard']);
      }
    } else {
      this.userType = null; // or set a default value
    }
  }

  getDashboardData() {
    this._service.dashboard().subscribe((response: any) => {
      if (response) {
        this.companyDashboardtData = response.data;
      }
    }, error => {
      this.toaster.error(error.massage, 'Error')
    });
  }

  getMemberDashboardData() {
    this._service.dashboardMember().subscribe((response: any) => {
      if (response) {
        this.memberDashboardtData = response.data;
      }
    }, error => {
      this.toaster.error(error.massage, 'Error')
    });
  }

  getCustomerDashboardData() {
    this._service.dashboardCustomer().subscribe((response: any) => {
      if (response) {
        this.customerDashboardtData = response.data;
      }
    }, error => {
      this.toaster.error(error.massage, 'Error')
    });
  }
}
