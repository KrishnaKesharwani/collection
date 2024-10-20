import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';

const routes: Routes = [
  { path: ''},
  { path: 'edit_company', component: EditCompanyComponent },
  { path: 'edit_details', component: EditDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileDetailsModule { }
