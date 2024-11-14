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
import { VcRoughtingModule } from './vc-management-routing.module';

@NgModule({
  declarations: [VcManagementComponent, AddVcComponent, ChangeMemberComponent, ReceivedAmountComponent, ViewDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonComponentsModule,
    VcRoughtingModule
  ]
})

export class VcManagementModule { }
