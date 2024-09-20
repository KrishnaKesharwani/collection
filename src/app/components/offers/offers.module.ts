import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersRoutingModule } from './offers-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { OffersComponent } from './offers.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';



@NgModule({
  declarations: [OffersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    OffersRoutingModule
  ]
})
export class OffersModule { }
