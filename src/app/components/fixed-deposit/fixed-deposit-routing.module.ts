import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedDepositComponent } from './fixed-deposit.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: 'fixed_deposit', component: FixedDepositComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedDepositRoutingModule { }
