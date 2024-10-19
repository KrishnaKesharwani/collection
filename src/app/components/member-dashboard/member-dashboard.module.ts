import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDashboardComponent } from './member-dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { MemberDashboardRoutingModule } from './member-dashboard-routing.module';
import { CommonComponentsModule } from 'src/app/common/common-components.module';



@NgModule({
  declarations: [MemberDashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MemberDashboardRoutingModule,
    CommonComponentsModule
  ],
  exports: [MemberDashboardComponent]
})
export class MemberDashboardModule { }
