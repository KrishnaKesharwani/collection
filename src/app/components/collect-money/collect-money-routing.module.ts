import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CollectMoneyComponent } from './collect-money.component';



const routes: Routes = [

  { path: 'collect_money', component: CollectMoneyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectMoneyRoutingModule { }
