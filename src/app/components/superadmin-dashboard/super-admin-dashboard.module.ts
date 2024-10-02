import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminDashboardComponent } from './superadmin-dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { SuperAdminDashboardRoutingModule } from './super-admin-dashboard-routing.module';



@NgModule({
  declarations: [SuperadminDashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SuperAdminDashboardRoutingModule
  ],
  exports: [SuperadminDashboardComponent]
})
export class SuperAdminDashboardModule { }
