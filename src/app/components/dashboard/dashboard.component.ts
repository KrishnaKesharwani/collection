import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminDashboardService } from 'src/app/services/dashboard/super-admin-dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  userType: any;
  companyDashboardtData: any;

  constructor(private router: Router, public _service: SuperAdminDashboardService) {


  }

  ngOnInit() {
    const data = localStorage.getItem('CurrentUser');
    if (data) {
      const userData = JSON.parse(data);
      this.userType = userData.user_type

      if (this.userType.user_type == 0) {
        this.router.navigate(['/superadmin_dashboard']);
      } else if (this.userType.user_type == 1) {
        this.router.navigate(['/admin_dashboard']);
      } else if (this.userType.user_type == 2) {
        this.router.navigate(['/member_dashboard']);
      } else if (this.userType.user_type == 3) {
        this.router.navigate(['/user_dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }

    } else {
      this.userType = null; // or set a default value
    }

    this.getDashboardData();
  }

  getDashboardData() {
    this._service.dashboard().subscribe((response: any) => {

      if (response) {
        this.companyDashboardtData = response.data;

      }
    })

  }
}
