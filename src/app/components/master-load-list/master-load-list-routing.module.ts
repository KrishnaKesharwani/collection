import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterLoadListComponent } from './master-load-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: 'master_loan_list', component: MasterLoadListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterLoadListRoutingModule { }
