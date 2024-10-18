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
import { NoRecordFoundComponent } from './no-record-found/no-record-found.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { GlobalGoogleChartsComponent } from './global-google-charts/global-google-charts.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { DynamicWidthDirective } from './directive/dynamic-width.directive';

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
    ButtonLoaderComponent,
    NoRecordFoundComponent,
    PageLoaderComponent,
    GlobalGoogleChartsComponent,
    DynamicWidthDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleChartsModule
  ],
  exports: [InputFieldValidationComponent, TextareaComponent, DropdwonComponent,
    InputComponent, FileuploadComponent, GlobalDatatableComponent, HeaderComponent,
    ButtonLoaderComponent, NoRecordFoundComponent, PageLoaderComponent, GlobalGoogleChartsComponent, DynamicWidthDirective]
})
export class CommonComponentsModule { }
