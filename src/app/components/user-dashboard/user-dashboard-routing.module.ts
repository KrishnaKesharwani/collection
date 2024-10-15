import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { UserloanListComponent } from './userloan-list/userloan-list.component';



const routes: Routes = [

  { path: '', component: UserDashboardComponent },
  {
    path: 'user/my_loan_list', 
    component: UserloanListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
