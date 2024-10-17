import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListComponent } from './loan-list.component';
import { MaterialModule } from 'src/app/material.module';
import { LoanListRoutingModule } from './loan-list-routing.module';
import { InstallmentHistoryComponent } from './installment-history/installment-history.component';
import { AssignMemberComponent } from './assign-member/assign-member.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { CommonComponentsModule } from "../../common/common-components.module";
import { LoanListViewComponent } from './loan-list-view/loan-list-view.component';



@NgModule({
  declarations: [LoanListComponent, InstallmentHistoryComponent, AssignMemberComponent, ChangeMemberComponent, ViewDetailsComponent, ChangeStatusComponent, LoanListViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LoanListRoutingModule,
    CommonComponentsModule
  ]
})
export class LoanListModule { }
