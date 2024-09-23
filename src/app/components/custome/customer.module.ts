import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomeComponent } from './custome.component';
import { MaterialModule } from 'src/app/material.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { ProviderLoanComponent } from './provider-loan/provider-loan.component';
import { ViewCustomerListComponent } from './view-customer-list/view-customer-list.component';
import { EditCustomerListComponent } from './edit-customer-list/edit-customer-list.component';



@NgModule({
  declarations: [CustomeComponent, LoanHistoryComponent, ProviderLoanComponent, ViewCustomerListComponent, EditCustomerListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
