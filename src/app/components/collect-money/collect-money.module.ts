import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CollectMoneyRoutingModule } from './collect-money-routing.module';
import { CollectMoneyComponent } from './collect-money.component';



@NgModule({
  declarations: [CollectMoneyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CollectMoneyRoutingModule
  ]
})
export class CollectMoneyModule { }
