import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyCollectionComponent } from './daily-collection.component';
import { MaterialModule } from 'src/app/material.module';
import { DailyCollectionRoutingModule } from './daily-collection-routing.module';



@NgModule({
  declarations: [DailyCollectionComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DailyCollectionRoutingModule
  ]
})
export class DailyCollectionModule { }
