import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminDashboardComponent } from './superadmin-dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { SuperAdminDashboardRoutingModule } from './super-admin-dashboard-routing.module';
import { CommonComponentsModule } from "../../common/common-components.module";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SuperadminDashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SuperAdminDashboardRoutingModule,
    CommonComponentsModule,
    FormsModule
  ],
  exports: [SuperadminDashboardComponent, FormsModule]
})
export class SuperAdminDashboardModule { }
