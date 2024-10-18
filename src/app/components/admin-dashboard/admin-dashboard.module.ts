import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material.module';
import { MassageForApplierComponent } from './massage-for-applier/massage-for-applier.component';
import { SuperAdminDashboardModule } from '../superadmin-dashboard/super-admin-dashboard.module';
import { MemberDashboardModule } from '../member-dashboard/member-dashboard.module';
import { UserDashboardModule } from '../user-dashboard/user-dashboard.module';
import { ActionForLoanComponent } from './action-for-loan/action-for-loan.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AdminDashboardComponent, MassageForApplierComponent, ActionForLoanComponent, ViewDetailsComponent],
  imports: [
    CommonModule,

    AdminDashboardRoutingModule,

    MaterialModule,
    CommonComponentsModule,
    ReactiveFormsModule,

  ],
  exports: [AdminDashboardComponent]
})
export class AdminDashboardModule { }
