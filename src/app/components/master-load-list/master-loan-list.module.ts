import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { MasterLoadListRoutingModule } from './master-load-list-routing.module';
import { MasterLoadListComponent } from './master-load-list.component';



@NgModule({
  declarations: [MasterLoadListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MasterLoadListRoutingModule
  ]
})
export class MasterLoanListModule { }
