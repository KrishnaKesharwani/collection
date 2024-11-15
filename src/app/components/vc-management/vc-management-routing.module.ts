import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VcManagementModule } from './vc-management.module';
import { VcManagementComponent } from './vc-management.component';


const routes: Routes = [

  { path: '', component: VcManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VcManagementRoutingModule { }