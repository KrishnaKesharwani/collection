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
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'superadmin_dashboard',
    loadChildren: () => import('./components/superadmin-dashboard/super-admin-dashboard.module').then(m => m.SuperAdminDashboardModule)
  },
  {
    path: 'admin_dashboard',
    loadChildren: () => import('./components/admin-dashboard/admin-dashboard-routing.module').then(m => m.AdminDashboardRoutingModule)
  },
  {
    path: 'member_dashboard',
    loadChildren: () => import('./components/member-dashboard/member-dashboard.module').then(m => m.MemberDashboardModule)
  },
  {
    path: 'user_dashboard',
    loadChildren: () => import('./components/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  },
  {
    path: 'fixed_deposit',
    loadChildren: () => import('./components/fixed-deposit/fixed-deposit.module').then(m => m.FixedDepositModule)
  },

  {
    path: 'member_list',
    loadChildren: () => import('./components/member-list/member-list.module').then(m => m.MemberListModule)
  },
  {
    path: 'customer_list',
    loadChildren: () => import('./components/custome/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'daily_collection',
    loadChildren: () => import('./components/daily-collection/daily-collection.module').then(m => m.DailyCollectionModule)
  },
  {
    path: 'loan_list',
    loadChildren: () => import('./components/loan-list/loan-list.module').then(m => m.LoanListModule)
  },
  {
    path: 'collection_list',
    loadChildren: () => import('./components/collection-list/collection-list.module').then(m => m.CollectionListModule)
  },
  {
    path: 'collect_money',
    loadChildren: () => import('./components/collect-money/collect-money.module').then(m => m.CollectMoneyModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./components/offers/offers.module').then(m => m.OffersModule)
  },
  {
    path: 'company_list',
    loadChildren: () => import('./components/company-list/company-list.module').then(m => m.CompanyListModule)
  },
  {
    path: 'master_loan_list',
    loadChildren: () => import('./components/master-load-list/master-loan-list.module').then(m => m.MasterLoanListModule)
  },
  {
    path: 'money_received',
    loadChildren: () => import('./components/menoy-received/money-received.module').then(m => m.MoneyReceivedModule)
  },
  {
    path: 'paid_data_entry',
    loadChildren: () => import('./components/paid-data-entry/paid-data-entry.module').then(m => m.PaidDataEntryModule)
  },
  { path: '**', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
