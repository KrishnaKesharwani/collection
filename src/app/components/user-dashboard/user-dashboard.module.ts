import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { UserDashboarddRoutingModule } from './user-dashboardd-routing.module';



@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UserDashboarddRoutingModule
  ],
  exports: [UserDashboardComponent]
})
export class UserDashboardModule { }
