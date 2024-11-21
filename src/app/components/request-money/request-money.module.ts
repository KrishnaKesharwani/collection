import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { RequestMoneyComponent } from './request-money.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { RequestMoneyRoughtingModule } from './request-money-routing.module';



@NgModule({
  declarations: [RequestMoneyComponent, ViewDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RequestMoneyRoughtingModule,
    ReactiveFormsModule,
    CommonComponentsModule,
  ]
})
export class RequestMoneyModule { }
