import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DailyCollectionComponent } from './daily-collection.component';



const routes: Routes = [

  { path: 'daily_collection', component: DailyCollectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyCollectionRoutingModule { }
