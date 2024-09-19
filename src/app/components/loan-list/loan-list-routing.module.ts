import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListComponent } from './loan-list.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  { path: 'loan_list', component: LoanListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanListRoutingModule { }
