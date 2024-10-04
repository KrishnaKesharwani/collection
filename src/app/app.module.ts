import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomeComponent } from './components/custome/custome.component';

// import { MatTooltipModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OffersComponent } from './components/offers/offers.component';
import { DailyCollectionComponent } from './components/daily-collection/daily-collection.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberToWordsPipe } from './pipes/number-to-words.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { MatIconModule } from '@angular/material/icon';
import { CollectMoneyComponent } from './components/collect-money/collect-money.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { FixedDepositComponent } from './components/fixed-deposit/fixed-deposit.component';
import { DeleteComponent } from './common/delete/delete.component';
import { ErrorComponent } from './common/error/error.component';
import { InputComponent } from './common/input/input.component';
import { FileuploadComponent } from './common/fileupload/fileupload.component';
import { DropdwonComponent } from './common/dropdwon/dropdwon.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { MasterLoadListComponent } from './components/master-load-list/master-load-list.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MenoyReceivedComponent } from './components/menoy-received/menoy-received.component';
import { PaidDataEntryComponent } from './components/paid-data-entry/paid-data-entry.component';
import { AdminDashboardModule } from './components/admin-dashboard/admin-dashboard.module';
import { MaterialModule } from './material.module';
import { FixedDepositModule } from './components/fixed-deposit/fixed-deposit.module';
import { UserDashboardModule } from './components/user-dashboard/user-dashboard.module';
import { MemberListModule } from './components/member-list/member-list.module';
import { CollectionListModule } from './components/collection-list/collection-list.module';
import { CollectMoneyModule } from './components/collect-money/collect-money.module';
import { CompanyListModule } from './components/company-list/company-list.module';
import { CustomerModule } from './components/custome/customer.module';
import { DailyCollectionModule } from './components/daily-collection/daily-collection.module';
import { LoanListModule } from './components/loan-list/loan-list.module';
import { MasterLoanListModule } from './components/master-load-list/master-loan-list.module';
import { MemberDashboardModule } from './components/member-dashboard/member-dashboard.module';
import { MoneyReceivedModule } from './components/menoy-received/money-received.module';
import { OffersModule } from './components/offers/offers.module';
import { PaidDataEntryModule } from './components/paid-data-entry/paid-data-entry.module';
import { LoginModule } from './authentication/login/login.module';
import { CommonComponentsModule } from './common/common-components.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';
import { MatNativeDateModule } from '@angular/material/core';
import { DataTablesModule } from 'angular-datatables';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ButtonLoaderComponent } from './common/button-loader/button-loader.component';
// import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,

    NumberToWordsPipe,
    SearchPipe,
    SidebarComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    DashboardModule,

    CollectionListModule,
    CollectMoneyModule,
    CompanyListModule,
    LoanListModule,
    MasterLoanListModule,

    MoneyReceivedModule,
    OffersModule,
    PaidDataEntryModule,
    LoginModule,
    CommonComponentsModule,
    DataTablesModule
    // MaterialModule,
    // AdminDashboardModule,
    // FixedDepositModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
