import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenoyReceivedComponent } from './menoy-received.component';



const routes: Routes = [

  { path: '', component: MenoyReceivedComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyReceivedRoutingModule { }
