import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './profile-details.component';
import { EditCompanyComponent } from './edit-company/edit-company.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileDetailsRoutingModule } from './profile-details-routing.module';

@NgModule({
  declarations: [ProfileDetailsComponent, EditCompanyComponent, EditDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProfileDetailsRoutingModule,
    CommonComponentsModule,
    ReactiveFormsModule
  ],
  exports: [ProfileDetailsComponent, EditCompanyComponent, EditDetailsComponent],
})

export class ProfileDetailsModule { }
