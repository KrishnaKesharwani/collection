import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyCollectListComponent } from './daily-collect-list.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonComponentsModule } from 'src/app/common/common-components.module';
import { DailyCollectListRoutingModule } from './daily-collect-list-routing.module';



@NgModule({
  declarations: [DailyCollectListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CommonComponentsModule,
    DailyCollectListRoutingModule
  ]
})
export class DailyCollectListModule { }
