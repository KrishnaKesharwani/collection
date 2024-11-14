import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VcManagementModule } from './vc-management.module';


const routes: Routes = [

  { path: '', component: VcManagementModule },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VcRoughtingModule { }