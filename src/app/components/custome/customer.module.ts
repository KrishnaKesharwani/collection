import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomeComponent } from './custome.component';
import { MaterialModule } from 'src/app/material.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { ProviderLoanComponent } from './provider-loan/provider-loan.component';
import { ViewCustomerListComponent } from './view-customer-list/view-customer-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldValidationComponent } from 'src/app/common/input-field-validation/input-field-validation.component';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerBulkImportComponent } from './customer-bulk-import/customer-bulk-import.component';
import { KeysPipe } from 'src/app/pipes/keys.pipe';
import { ApplyLoanComponent } from './apply-loan/apply-loan.component';
import { NewDepositComponent } from './new-deposit/new-deposit.component';



@NgModule({
  declarations: [
    CustomeComponent, LoanHistoryComponent, ProviderLoanComponent, ViewCustomerListComponent, AddCustomerComponent
    , CustomerBulkImportComponent, KeysPipe, ApplyLoanComponent, NewDepositComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    CommonComponentsModule
  ]
})
export class CustomerModule { }
