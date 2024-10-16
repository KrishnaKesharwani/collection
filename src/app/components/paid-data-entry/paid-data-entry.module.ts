import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaidDataEntryComponent } from './paid-data-entry.component';
import { PaidDataEntryRoutingModule } from './paid-data-entry-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { CommonComponentsModule } from "../../common/common-components.module";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PaidDataEntryComponent],
  imports: [
    CommonModule,
    PaidDataEntryRoutingModule,
    MaterialModule,
    CommonComponentsModule,
    ReactiveFormsModule
]
})
export class PaidDataEntryModule { }
