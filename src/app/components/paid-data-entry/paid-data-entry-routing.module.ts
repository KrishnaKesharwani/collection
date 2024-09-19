import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PaidDataEntryComponent } from './paid-data-entry.component';



const routes: Routes = [

  { path: 'paid_data', component: PaidDataEntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaidDataEntryRoutingModule { }
