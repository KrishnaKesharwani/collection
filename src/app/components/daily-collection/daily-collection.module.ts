import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyCollectionComponent } from './daily-collection.component';
import { MaterialModule } from 'src/app/material.module';
import { DailyCollectionRoutingModule } from './daily-collection-routing.module';
import { CollectionHistoryComponent } from './collection-history/collection-history.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { DropdwonComponent } from 'src/app/common/dropdwon/dropdwon.component';



@NgModule({
  declarations: [DailyCollectionComponent, CollectionHistoryComponent, AssignMemberComponent, ChangeMemberComponent, ViewDetailsComponent, ChangeStatusComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DailyCollectionRoutingModule
  ]
})
export class DailyCollectionModule { }
