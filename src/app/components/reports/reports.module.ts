import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReportsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
