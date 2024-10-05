import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CommonComponentsModule } from "../../common/common-components.module";
import { MoneyReceivedRoutingModule } from './money-received-routing.module';
import { MoneyReceivedComponent } from './money-received.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { VpdateStatusComponent } from './vpdate-status/vpdate-status.component';
import { AdvanceMoneyComponent } from './advance-money/advance-money.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MoneyReceivedComponent, ViewDetailsComponent, VpdateStatusComponent, AdvanceMoneyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MoneyReceivedRoutingModule,
    CommonComponentsModule,
    ReactiveFormsModule
]
})
export class MoneyReceivedModule { }
