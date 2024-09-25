import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListRoutingModule } from './member-list-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { MemberListComponent } from './member-list.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { EditMemberListComponent } from './edit-member-list/edit-member-list.component';
import { ViewMemberListComponent } from './view-member-list/view-member-list.component';
import { AssignLoanComponent } from './assign-loan/assign-loan.component';
import { InputFieldValidationComponent } from 'src/app/common/input-field-validation/input-field-validation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from 'src/app/common/common-components.module';



@NgModule({
  declarations: [MemberListComponent, EditMemberListComponent, ViewMemberListComponent, AssignLoanComponent],
  imports: [
    CommonModule,
    MemberListRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonComponentsModule
  ]
})
export class MemberListModule { }
