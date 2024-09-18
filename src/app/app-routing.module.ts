import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { CustomeComponent } from './components/custome/custome.component';
import { DailyCollectionComponent } from './components/daily-collection/daily-collection.component';
import { MemberDashboardComponent } from './components/member-dashboard/member-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { CollectionListComponent } from './components/collection-list/collection-list.component';
import { CollectMoneyComponent } from './components/collect-money/collect-money.component';
import { OffersComponent } from './components/offers/offers.component';
import { FixedDepositComponent } from './components/fixed-deposit/fixed-deposit.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { MasterLoadListComponent } from './components/master-load-list/master-load-list.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MenoyReceivedComponent } from './components/menoy-received/menoy-received.component';
import { PaidDataEntryComponent } from './components/paid-data-entry/paid-data-entry.component';
// import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, //default route

  { path: 'login', component: LoginComponent },
  { path: 'customer_list', component: CustomeComponent },
  { path: 'daily_collection', component: DailyCollectionComponent },
  { path: 'member_dashboard', component: MemberDashboardComponent },
  { path: 'user_dashboard', component: UserDashboardComponent },
  { path: 'superadmin_dashboard', component: SuperadminDashboardComponent },
  { path: 'admin_dashboard', component: AdminDashboardComponent },
  { path: 'loan_list', component: LoanListComponent },
  { path: 'collection_list', component: CollectionListComponent },
  { path: 'collect_money', component: CollectMoneyComponent },
  { path: 'fixed_deposit', component: FixedDepositComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'company_list', component: CompanyListComponent },
  { path: 'master_loan_list', component: MasterLoadListComponent },
  { path: 'member_list', component: MemberListComponent },
  { path: 'money_received', component: MenoyReceivedComponent },
  { path: 'paid_data', component: PaidDataEntryComponent },
  { path: '**', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
