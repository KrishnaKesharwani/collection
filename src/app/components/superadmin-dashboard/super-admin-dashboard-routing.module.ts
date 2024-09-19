import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminDashboardComponent } from './superadmin-dashboard.component';



const routes: Routes = [

  { path: '', component: SuperadminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminDashboardRoutingModule { }
