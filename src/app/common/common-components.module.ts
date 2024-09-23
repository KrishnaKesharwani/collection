import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteComponent } from './delete/delete.component';
import { ErrorComponent } from './error/error.component';
import { InputComponent } from './input/input.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DropdwonComponent } from './dropdwon/dropdwon.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [


    ErrorComponent,
    InputComponent,
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule]
})
export class CommonComponentsModule { }
