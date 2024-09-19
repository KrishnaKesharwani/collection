import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DeleteComponent } from './delete/delete.component';
import { ErrorComponent } from './error/error.component';
import { InputComponent } from './input/input.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { DropdwonComponent } from './dropdwon/dropdwon.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [HeaderComponent,
    SidebarComponent,
    DeleteComponent,
    ErrorComponent,
    InputComponent,
    FileuploadComponent,
    DropdwonComponent,
    LayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CommonComponentsModule { }
