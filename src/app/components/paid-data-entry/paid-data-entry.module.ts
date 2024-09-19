import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaidDataEntryComponent } from './paid-data-entry.component';
import { PaidDataEntryRoutingModule } from './paid-data-entry-routing.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [PaidDataEntryComponent],
  imports: [
    CommonModule,
    PaidDataEntryRoutingModule,
    MaterialModule
  ]
})
export class PaidDataEntryModule { }
