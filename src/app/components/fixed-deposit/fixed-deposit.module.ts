import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FixedDepositComponent } from './fixed-deposit.component';
import { FixedDepositRoutingModule } from './fixed-deposit-routing.module';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFixedDepositComponent } from './add-fixed-deposit/add-fixed-deposit.component';

@NgModule({
  declarations: [FixedDepositComponent, ViewDetailsComponent, ChangeStatusComponent, AddFixedDepositComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FixedDepositRoutingModule,
    CommonComponentsModule,
    ReactiveFormsModule
  ]
})
export class FixedDepositModule { }
