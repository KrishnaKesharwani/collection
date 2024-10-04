import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteComponent } from './delete/delete.component';
import { ErrorComponent } from './error/error.component';
import { InputComponent } from './input/input.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DropdwonComponent } from './dropdwon/dropdwon.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFieldValidationComponent } from './input-field-validation/input-field-validation.component';
import { GlobalDatatableComponent } from './global-datatable/global-datatable.component';
import { DataTablesModule } from 'angular-datatables';
import { HeaderComponent } from './header/header.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ButtonLoaderComponent } from './button-loader/button-loader.component';

@NgModule({
  declarations: [
    ErrorComponent,
    InputComponent,
    FileuploadComponent,
    DropdwonComponent,
    InputFieldValidationComponent,
    GlobalDatatableComponent,
    HeaderComponent,
    TextareaComponent,
    ButtonLoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [InputFieldValidationComponent, TextareaComponent, DropdwonComponent,
    InputComponent, FileuploadComponent, GlobalDatatableComponent, HeaderComponent,
    ButtonLoaderComponent]
})
export class CommonComponentsModule { }
