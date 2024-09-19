import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CollectionListRoutingModule } from './collection-list-routing.module';
import { CollectionListComponent } from './collection-list.component';



@NgModule({
  declarations: [CollectionListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CollectionListRoutingModule
  ]
})
export class CollectionListModule { }
