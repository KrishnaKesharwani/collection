import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CollectMoneyRoutingModule } from './collect-money-routing.module';
import { CollectMoneyComponent } from './collect-money.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ChangeStatusComponent } from './change-status/change-status.component';



@NgModule({
  declarations: [CollectMoneyComponent, ViewDetailsComponent, ChangeStatusComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CollectMoneyRoutingModule
  ]
})
export class CollectMoneyModule { }
