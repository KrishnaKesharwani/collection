import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomeComponent } from './custome.component';

const routes: Routes = [
  { path: '', component: CustomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
}) export class CustomerRoutingModule { }
