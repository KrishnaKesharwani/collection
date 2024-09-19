import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionListComponent } from './collection-list.component';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [

  { path: '', component: CollectionListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionListRoutingModule { }
