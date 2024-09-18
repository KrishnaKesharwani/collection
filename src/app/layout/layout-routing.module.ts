import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, //default route
  { path: 'dashboard', component: DashboardComponent, pathMatch: "full" },
//   { path: 'customer', component: CustomeComponent },
//   { path: 'daily_collection', component: DailyCollectionComponent },
//   { path: 'member_dashboard', component: MemberDashboardComponent },
//   { path: 'user_dashboard', component: UserDashboardComponent },
//   { path: 'superadmin_dashboard', component: SuperadminDashboardComponent },
//   { path: 'admin_dashboard', component: AdminDashboardComponent },
//   { path: 'loan_list', component: LoanListComponent },
//   { path: 'collection_list', component: CollectionListComponent },
//   { path: 'collect_money', component: CollectMoneyComponent },
//   { path: '**', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
