import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list.component';
import { MaterialModule } from 'src/app/material.module';
import { CompanyListRoutingModule } from './company-list-routing.module';
import { CompanyHistoryComponent } from './company-history/company-history.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ReceivedAmountComponent } from './received-amount/received-amount.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CompanyListComponent, CompanyHistoryComponent, ViewDetailsComponent, EditCustomerComponent, ReceivedAmountComponent, AddCompanyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CompanyListRoutingModule,
    CommonComponentsModule,
    ReactiveFormsModule
  ]
})
export class CompanyListModule { }
