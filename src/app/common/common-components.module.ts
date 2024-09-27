import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteComponent } from './delete/delete.component';
import { ErrorComponent } from './error/error.component';
import { InputComponent } from './input/input.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DropdwonComponent } from './dropdwon/dropdwon.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldValidationComponent } from './input-field-validation/input-field-validation.component';


@NgModule({
  declarations: [

    ErrorComponent,
    InputComponent,
    FileuploadComponent,
    DropdwonComponent,
    InputFieldValidationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [InputFieldValidationComponent, DropdwonComponent, FileuploadComponent]
})
export class CommonComponentsModule { }
