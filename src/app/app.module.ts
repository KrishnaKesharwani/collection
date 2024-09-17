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
    SearchPipe
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
    MatSelectModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
