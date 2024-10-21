import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { ProfileDetailsComponent } from './profile-details.component';


const routes: Routes = [
  { path: '', component: ProfileDetailsComponent},
  { path: 'profile_details/edit-details', component: EditDetailsComponent },
  { path: 'profile_details/edit-company', component: EditCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProfileDetailsRoutingModule { }
