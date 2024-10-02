import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardModule } from '../admin-dashboard/admin-dashboard.module';
import { SuperAdminDashboardModule } from '../superadmin-dashboard/super-admin-dashboard.module';
import { MemberDashboardModule } from '../member-dashboard/member-dashboard.module';
import { UserDashboardModule } from '../user-dashboard/user-dashboard.module';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SuperAdminDashboardModule,
    AdminDashboardModule,
    MemberDashboardModule,
    UserDashboardModule

  ]
})
export class DashboardModule { }
