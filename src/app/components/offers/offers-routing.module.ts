import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './offers.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { path: '', component: OffersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
