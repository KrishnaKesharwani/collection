import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { DownloadReportComponent } from './download-report/download-report.component';



@NgModule({
  declarations: [ReportsComponent, DownloadReportComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReportsRoutingModule,
    ReactiveFormsModule,
    CommonComponentsModule,
  ]
})
export class ReportsModule { }
