import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanListComponent } from './loan-list.component';
import { MaterialModule } from 'src/app/material.module';
import { LoanListRoutingModule } from './loan-list-routing.module';



@NgModule({
  declarations: [LoanListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LoanListRoutingModule
  ]
})
export class LoanListModule { }
