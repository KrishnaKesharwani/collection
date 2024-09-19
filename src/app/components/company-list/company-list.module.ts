import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list.component';
import { MaterialModule } from 'src/app/material.module';
import { CompanyListRoutingModule } from './company-list-routing.module';



@NgModule({
  declarations: [CompanyListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CompanyListRoutingModule
  ]
})
export class CompanyListModule { }
