import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomeComponent } from './custome.component';
import { MaterialModule } from 'src/app/material.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { DeleteComponent } from 'src/app/common/delete/delete.component';



@NgModule({
  declarations: [CustomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
