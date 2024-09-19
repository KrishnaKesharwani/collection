import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FixedDepositComponent } from './fixed-deposit.component';
import { FixedDepositRoutingModule } from './fixed-deposit-routing.module';



@NgModule({
  declarations: [FixedDepositComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FixedDepositRoutingModule
  ]
})
export class FixedDepositModule { }
