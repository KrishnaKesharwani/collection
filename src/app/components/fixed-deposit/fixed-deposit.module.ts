import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FixedDepositComponent } from './fixed-deposit.component';
import { FixedDepositRoutingModule } from './fixed-deposit-routing.module';
import { EditFixedDepositComponent } from './edit-fixed-deposit/edit-fixed-deposit.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { DropdwonComponent } from 'src/app/common/dropdwon/dropdwon.component';



@NgModule({
  declarations: [FixedDepositComponent, EditFixedDepositComponent, ViewDetailsComponent, ChangeStatusComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FixedDepositRoutingModule
  ]
})
export class FixedDepositModule { }
