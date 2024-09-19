import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MoneyReceivedRoutingModule } from './money-received-routing.module';
import { MenoyReceivedComponent } from './menoy-received.component';



@NgModule({
  declarations: [MenoyReceivedComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MoneyReceivedRoutingModule
  ]
})
export class MoneyReceivedModule { }
