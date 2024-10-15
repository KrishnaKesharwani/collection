import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserloanListComponent } from './userloan-list/userloan-list.component';



const routes: Routes = [

  { path: '', component: UserloanListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboarddRoutingModule { }
