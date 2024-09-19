import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FixedDepositComponent } from './components/fixed-deposit/fixed-deposit.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { CollectMoneyComponent } from './components/collect-money/collect-money.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { PaidDataEntryComponent } from './components/paid-data-entry/paid-data-entry.component';
import { MasterLoadListComponent } from './components/master-load-list/master-load-list.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { CompanyListComponent } from './components/company-list/company-list.component';

@NgModule({
  declarations: [
    // UserDashboardComponent
    // AdminDashboardComponent, SuperadminDashboardComponent,
    // FixedDepositComponent, MemberDashboardComponent,
    // MemberListComponent, CollectMoneyComponent, CollectionListComponent, PaidDataEntryComponent,
    // MasterLoadListComponent, LoanListComponent, CompanyListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
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
    }),
  ],
  exports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
})
export class MaterialModule { }
