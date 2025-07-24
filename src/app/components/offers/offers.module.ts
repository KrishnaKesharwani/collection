import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersRoutingModule } from './offers-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { OffersComponent } from './offers.component';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { AddOfferComponent } from './add-offer/add-offer.component';
import { ViewOfferComponent } from './view-offer/view-offer.component';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OffersComponent, AddOfferComponent, ViewOfferComponent],
  imports: [
    CommonModule,
    MaterialModule,
    OffersRoutingModule,
    CommonComponentsModule,
    ReactiveFormsModule
  ]
})
export class OffersModule { }
