import { NgModule } from '@angular/core';
import { FixedDepositComponent } from './fixed-deposit.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', component: FixedDepositComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedDepositRoutingModule { }
