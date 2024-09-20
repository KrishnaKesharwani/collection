import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListRoutingModule } from './member-list-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { MemberListComponent } from './member-list.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';



@NgModule({
  declarations: [MemberListComponent],
  imports: [
    CommonModule,
    MemberListRoutingModule,
    MaterialModule
  ]
})
export class MemberListModule { }
