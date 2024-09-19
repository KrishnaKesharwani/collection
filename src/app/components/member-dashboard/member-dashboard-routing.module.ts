import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberDashboardComponent } from './member-dashboard.component';


const routes: Routes = [

  { path: 'member_dashboard', component: MemberDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberDashboardRoutingModule { }
