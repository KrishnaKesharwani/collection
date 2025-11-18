import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcManagementComponent } from './vc-management.component';
import { AddVcComponent } from './add-vc/add-vc.component';
import { ReceivedAmountComponent } from './received-amount/received-amount.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeMemberComponent } from './change-member/change-member.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { VcManagementRoutingModule } from './vc-management-routing.module';
import { AddInstalmentComponent } from './add-instalment/add-instalment.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { VcReceivedMembersComponent } from './vc-received-members/vc-received-members.component';
import { VcPaidAmountComponent } from './vc-paid-amount/vc-paid-amount.component';

@NgModule({
  declarations: [VcManagementComponent, AddVcComponent, ChangeMemberComponent, ReceivedAmountComponent, ViewDetailsComponent, AddInstalmentComponent, ChangeStatusComponent, VcReceivedMembersComponent, VcPaidAmountComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    VcManagementRoutingModule
  ]
})

export class VcManagementModule { }
