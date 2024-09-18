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
import { UserComponent } from './components/user/user.component';
import { CollectMoneyComponent } from './components/collect-money/collect-money.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { ToastrModule } from 'ngx-toastr';
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
    UserComponent,
    CollectMoneyComponent,
    CollectionListComponent,
    LoanListComponent,
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
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
