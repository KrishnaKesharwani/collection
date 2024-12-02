import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [

  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
    // runGuardsAndResolvers: 'always'
  },
  // {
  //   path: 'superadmin_dashboard',
  //   loadChildren: () => import('./components/superadmin-dashboard/super-admin-dashboard.module').then(m => m.SuperAdminDashboardModule)
  // },
  // {
  //   path: 'admin_dashboard',
  //   loadChildren: () => import('./components/admin-dashboard/admin-dashboard-routing.module').then(m => m.AdminDashboardRoutingModule)
  // },
  // {
  //   path: 'member_dashboard',
  //   loadChildren: () => import('./components/member-dashboard/member-dashboard.module').then(m => m.MemberDashboardModule)
  // },
  // {
  //   path: 'user_dashboard',
  //   loadChildren: () => import('./components/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  // },
  {
    path: 'fixed_deposit',
    loadChildren: () => import('./components/fixed-deposit/fixed-deposit.module').then(m => m.FixedDepositModule),
    // runGuardsAndResolvers: 'always'
  },

  {
    path: 'member_list',
    loadChildren: () => import('./components/member-list/member-list.module').then(m => m.MemberListModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'customer_list',
    loadChildren: () => import('./components/custome/customer.module').then(m => m.CustomerModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'daily_collection',
    loadChildren: () => import('./components/daily-collect-list/daily-collect-list.module').then(m => m.DailyCollectListModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'daily_collect_list',
    loadChildren: () => import('./components/daily-collection/daily-collection.module').then(m => m.DailyCollectionModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'loan_list',
    loadChildren: () => import('./components/loan-list/loan-list.module').then(m => m.LoanListModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'my_loan_list',
    loadChildren: () => import('./components/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'collection_list',
    loadChildren: () => import('./components/collection-list/collection-list.module').then(m => m.CollectionListModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'collect_money',
    loadChildren: () => import('./components/collect-money/collect-money.module').then(m => m.CollectMoneyModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'offers',
    loadChildren: () => import('./components/offers/offers.module').then(m => m.OffersModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'company_list',
    loadChildren: () => import('./components/company-list/company-list.module').then(m => m.CompanyListModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'master_loan_list',
    loadChildren: () => import('./components/master-load-list/master-loan-list.module').then(m => m.MasterLoanListModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'money_received',
    loadChildren: () => import('./components/money-received/money-received.module').then(m => m.MoneyReceivedModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'paid_data_entry/:id',
    loadChildren: () => import('./components/paid-data-entry/paid-data-entry.module').then(m => m.PaidDataEntryModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'reports',
    loadChildren: () => import('./components/reports/reports.module').then(m => m.ReportsModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'profile_details',
    loadChildren: () => import('./components/profile-details/profile-details.module').then(m => m.ProfileDetailsModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'change_password',
    loadChildren: () => import('./components/change-password/change-password.module').then(m => m.ChangePasswordModule),    
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'vc_management',
    loadChildren: () => import('./components/vc-management/vc-management.module').then(m => m.VcManagementModule),
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'request_money',
    loadChildren: () => import('./components/request-money/request-money.module').then(m => m.RequestMoneyModule),
    // runGuardsAndResolvers: 'always'
  },
  { path: '**', component: LoginComponent }
]

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
