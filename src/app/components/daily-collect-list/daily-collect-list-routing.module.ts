import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyCollectListComponent } from './daily-collect-list.component';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [

  { path: '', component: DailyCollectListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyCollectListRoutingModule { }
