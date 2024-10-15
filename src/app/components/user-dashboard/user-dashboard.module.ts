import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { UserDashboarddRoutingModule } from './user-dashboardd-routing.module';
import { CommonComponentsModule } from "../../common/common-components.module";
import { ViewDetailsComponent } from './view-details/view-details.component';
import { UserloanListComponent } from './userloan-list/userloan-list.component';



@NgModule({
  declarations: [UserDashboardComponent, ViewDetailsComponent, UserloanListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UserDashboarddRoutingModule,
    CommonComponentsModule
],
  exports: [UserDashboardComponent, CommonComponentsModule, MaterialModule]
})
export class UserDashboardModule { }
