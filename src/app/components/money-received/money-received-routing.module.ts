import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoneyReceivedComponent } from './money-received.component';



const routes: Routes = [

  { path: '', component: MoneyReceivedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyReceivedRoutingModule { }
