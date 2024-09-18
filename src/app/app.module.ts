import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomeComponent } from './components/custome/custome.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
// import { MatTooltipModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
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
// import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomeComponent,
    OffersComponent,
    DailyCollectionComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    MemberDashboardComponent,
    SuperadminDashboardComponent,
    LoginComponent,
    NumberToWordsPipe,
    SearchPipe,

    CollectMoneyComponent,
    CollectionListComponent,
    LoanListComponent,
    HeaderComponent,
    SidebarComponent,
    FixedDepositComponent,
    DeleteComponent,
    ErrorComponent,
    InputComponent,
    FileuploadComponent,
    DropdwonComponent,
    CompanyListComponent,
    MasterLoadListComponent,
    MemberListComponent,
    MenoyReceivedComponent,
    PaidDataEntryComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
