import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListRoutingModule } from './member-list-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { MemberListComponent } from './member-list.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { EditMemberListComponent } from './edit-member-list/edit-member-list.component';
import { ViewMemberListComponent } from './view-member-list/view-member-list.component';
import { AssignLoanComponent } from './assign-loan/assign-loan.component';



@NgModule({
  declarations: [MemberListComponent, EditMemberListComponent, ViewMemberListComponent, AssignLoanComponent],
  imports: [
    CommonModule,
    MemberListRoutingModule,
    MaterialModule
  ]
})
export class MemberListModule { }
