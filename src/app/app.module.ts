import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomeComponent } from './components/custome/custome.component';

// import { MatTooltipModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; import { ReactiveFormsModule } from '@angular/forms';
import { NumberToWordsPipe } from './pipes/number-to-words.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { OffersComponent } from './components/offers/offers.component';
import { DailyCollectionComponent } from './components/daily-collection/daily-collection.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { CollectMoneyComponent } from './components/collect-money/collect-money.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './common/header/header.component';
import { FixedDepositComponent } from './components/fixed-deposit/fixed-deposit.component';
import { DeleteComponent } from './common/delete/delete.component';
import { ErrorComponent } from './common/error/error.component';
import { InputComponent } from './common/input/input.component';
import { FileuploadComponent } from './common/fileupload/fileupload.component';
import { DropdwonComponent } from './common/dropdwon/dropdwon.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { MasterLoadListComponent } from './components/master-load-list/master-load-list.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MoneyReceivedComponent } from './components/money-received/money-received.component';
import { PaidDataEntryComponent } from './components/paid-data-entry/paid-data-entry.component';
import { AdminDashboardModule } from './components/admin-dashboard/admin-dashboard.module';
import { MaterialModule } from './material.module';
import { FixedDepositModule } from './components/fixed-deposit/fixed-deposit.module';
import { UserDashboardModule } from './components/user-dashboard/user-dashboard.module';
import { MemberListModule } from './components/member-list/member-list.module';
import { CustomerModule } from './components/custome/customer.module';
import { DailyCollectionModule } from './components/daily-collection/daily-collection.module';
import { MemberDashboardModule } from './components/member-dashboard/member-dashboard.module';
import { MatNativeDateModule } from '@angular/material/core';
import { CollectionListModule } from './components/collection-list/collection-list.module';
import { CollectMoneyModule } from './components/collect-money/collect-money.module';
import { CompanyListModule } from './components/company-list/company-list.module';
import { LoanListModule } from './components/loan-list/loan-list.module';
import { MasterLoanListModule } from './components/master-load-list/master-loan-list.module';
import { MoneyReceivedModule } from './components/money-received/money-received.module';
import { OffersModule } from './components/offers/offers.module';
import { PaidDataEntryModule } from './components/paid-data-entry/paid-data-entry.module';
import { LoginModule } from './authentication/login/login.module';
import { CommonComponentsModule } from './common/common-components.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';
// import { DataTablesModule } from 'angular-datatables';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ChangePasswordModule } from './components/change-password/change-password.module';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { ProfileDetailsModule } from './components/profile-details/profile-details.module';
import { ReportsModule } from './components/reports/reports.module';
import { VcManagementModule } from './components/vc-management/vc-management.module';
// import { LayoutComponent } from './layout/layout.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ProfileDetailsModule,
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
    // DataTablesModule,
    ChangePasswordModule,
    ReportsModule,
    VcManagementModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
